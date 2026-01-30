import { IMemo, ICreateMemoInput, IMemoCreate } from "@models/memo";
import { MemosRepository } from "../repositories";
import { MIME_TO_EXT } from "@shared/convert-extension";
import { AppError } from "@shared/app-error";
import { FsClient } from "@config/fs-client";
import { MinioClient } from "@config/minio";
import { MqClient } from "@config/mq-client";
import { logger } from "@shared/logger";

export class MemosCreateUseCase {
    constructor(
        private readonly memosRepository: MemosRepository, 
        private readonly minioClient: MinioClient = new MinioClient, 
        private readonly fsClient: FsClient = new FsClient, 
        private readonly mqClient = new MqClient
    ) {    
        this.memosRepository = memosRepository
        this.minioClient = minioClient
        this.fsClient = fsClient
        this.mqClient = mqClient
    }
  
    async execute(input: ICreateMemoInput): Promise<IMemo | AppError> {
        const filePath = input.filePath
        const mime = MIME_TO_EXT[input.mimetype]
        const streamPath = `${filePath}.${mime}`

        try {
            this.fsClient.rename(filePath, streamPath)
            const fileStream = this.fsClient.create(streamPath)
            
            // Save on storage
            const storage = await this.minioClient.upload({
                filePath: streamPath,
                mimetype: mime,
                userId: input.userId
            })
            
            // Clean after save on minio
            this.fsClient.delete(filePath, streamPath)

            // Create Memo
            const memo = await this.memosRepository.createMemo({
                path: storage.data.dest,
                summary: "Processing",
                status: "PENDING",
                text: "",
                title: "New audio Memo",
                userId: input.userId
            })

            if (memo instanceof AppError) {
                logger.fatal("Error creating memo")
                throw new AppError("Error creating memo", 500)
            }
            
            // Send to queue
            await this.mqClient.sendToTranscription({
                fileKey: memo.path,
                memoId: memo.id,
                userId: input.userId,
                language: input.language
            })

            return memo

        } catch (err: any) {
            this.fsClient.delete(filePath, streamPath)
            throw new AppError(`Internal Server Error: ${err}`, 500)
        }
    }
}
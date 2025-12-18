import { IMemo, ICreateMemoInput } from "@models/memo";
import { MemosRepository } from "../repositories";
import { MIME_TO_EXT } from "@shared/convert-extension";
import { AppError } from "@shared/app-error";
import { FsClient } from "@config/fs-client";
import { MinioClient } from "@config/minio";
import { AIClient } from "@config/ai-client";

export class MemosCreateUseCase {
    private readonly minio: MinioClient
    private readonly fs: FsClient
    private readonly ai: AIClient 

    constructor(
        private memosRepository: MemosRepository, private minioClient: MinioClient = new MinioClient, private fsClient: FsClient = new FsClient, private aiClient = new AIClient
    ) {    
        this.memosRepository = memosRepository
        this.minio = minioClient
        this.fs = fsClient
        this.ai = aiClient
    }
  
    async execute(input: ICreateMemoInput): Promise<IMemo | AppError> {
        const filePath = input.filePath
        const mime = MIME_TO_EXT[input.mimetype]
        const streamPath = `${filePath}.${mime}`

        try {
            this.fs.rename(filePath, streamPath)
            const fileStream = this.fs.create(streamPath)

            // Transcription
            const transcripiton = await this.ai.createAudioDescription({
                file: fileStream,
                model: "whisper-large-v3",
                responseFormat: "json",
                language: "pt"
            })
            
            // Save on storage
            const storage = await this.minio.upload({
                filePath: streamPath,
                mimetype: mime,
                userId: input.userId
            })
            
            // Clean after save on minio
            this.fs.delete(filePath, streamPath)

            // Create Memo
            const memo = await this.memosRepository.createMemo({
                path: storage.data.dest,
                summary: "",
                text: transcripiton.text,
                title: transcripiton.text.substring(0, 50) + "...",
                userId: input.userId
            }) 

            return memo

        } catch (err: any) {
            this.fs.delete(filePath, streamPath)
            throw new AppError(`Internal Server Error: ${err}`, 500)
        }
    }
}
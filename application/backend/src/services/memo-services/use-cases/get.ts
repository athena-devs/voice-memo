import { AppError } from "@shared/app-error";
import { MemosRepository } from "../repositories";
import { IResponseFmt, responseFormat } from "@shared/response-format";
import { MinioClient } from "@config/minio";

export class MemoGetUseCase {
    constructor(
        private memosRepository: MemosRepository,
        private minioClient: MinioClient = new MinioClient
    ) {
        this.memosRepository = memosRepository
        this.minioClient = minioClient
    }
  
    async execute(id: string): Promise<IResponseFmt | AppError> {
        const memo = await this.memosRepository.getMemo(id)
        
        if (!memo) {
            throw new AppError("Memo not found!", 404)
        }

        const audioUrl = await this.minioClient.getAudioUrl(memo.path);

        return responseFormat({
            data: {payload: memo, url: audioUrl }, 
            message: "Memo retrivied succesfully",
            statusCode: 200

        })
    }
}
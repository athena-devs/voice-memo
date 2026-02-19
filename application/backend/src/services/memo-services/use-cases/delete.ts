import { AppError } from "@shared/app-error";
import { MemosRepository } from "../repositories";
import { IResponseFmt, responseFormat } from "@shared/response-format";
import { MinioClient } from "@config/minio";

export class MemosDeleteUseCase {
    constructor(
        private memosRepository: MemosRepository,
        private minioClient: MinioClient
    ) {
        this.memosRepository = memosRepository
        this.minioClient = new MinioClient()
    }
  
    async execute(id: string): Promise<IResponseFmt | AppError> {
        const memo = await this.memosRepository.getMemo(id)

        if (!memo) {
            throw new AppError("Memo not found!", 404)        
        }

        if (memo.path) {
            await this.minioClient.deleteFile(memo.path)
        }

        const payload = await this.memosRepository.deleteMemo(id)
        
        return responseFormat({
            data: payload, 
            message: "Memo deleted",
            statusCode: 200

        })
    }
}
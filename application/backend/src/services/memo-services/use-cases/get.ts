import { AppError } from "@shared/app-error";
import { MemosRepository } from "../repositories";
import { IResponseFmt, responseFormat } from "@shared/response-format";

export class MemosGetUseCase {
    constructor(private memosRepository: MemosRepository) {
        this.memosRepository = memosRepository
    }
  
    async execute(id: string): Promise<IResponseFmt | AppError> {
        const payload = await this.memosRepository.getMemo(id)
        
        if (!payload) {
            throw new AppError("Memo not found!", 404)
        }

        return responseFormat({
            data: payload, 
            message: "Memo retrivied succesfully",
            statusCode: 200

        })
    }
}
import { AppError } from "@shared/app-error";
import { MemosRepository } from "../repositories";
import { IResponseFmt, responseFormat } from "@shared/response-format";
import { IMemo } from "@models/memo";

export class MemosUpdateUseCase {
    constructor(private memosRepository: MemosRepository) {
        this.memosRepository = memosRepository
    }
  
    async execute(id: string, data:  IMemo): Promise<IResponseFmt | AppError> {
        const memo = await this.memosRepository.getMemo(id)

        if (!memo) {
            throw new AppError("Memo not found!", 404)        
        }
        
        const payload = await this.memosRepository.updateMemo(id, data)
        
        return responseFormat({
            data: payload, 
            message: "User deleted",
            statusCode: 200

        })
    }
}
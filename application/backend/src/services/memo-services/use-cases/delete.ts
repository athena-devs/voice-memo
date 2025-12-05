import { AppError } from "@shared/app-error";
import { MemosRepository } from "../repositories";
import { IResponseFmt, responseFormat } from "@shared/response-format";

export class MemosDeleteUseCase {
    constructor(private memosRepository: MemosRepository) {
        this.memosRepository = memosRepository
    }
  
    async execute(id: string): Promise<IResponseFmt | AppError> {
        const memo = await this.memosRepository.getMemo(id)

        if (!memo) {
            throw new AppError("Memo not found!", 404)        
        }

        const payload = await this.memosRepository.deleteMemo(id)
        
        return responseFormat({
            data: payload, 
            message: "Memo deleted",
            statusCode: 200

        })
    }
}
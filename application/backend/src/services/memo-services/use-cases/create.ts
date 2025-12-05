import { IMemo } from "@models/memo";
import { MemosRepository } from "../repositories";

export class MemosCreateUseCase {
    constructor(private memosRepository: MemosRepository) {
        this.memosRepository = memosRepository
    }
  
    async execute(data: IMemo): Promise<IMemo> {
        const user = await this.memosRepository.createMemo(data)
        return user
    }
}
import { PrismaMemosRepository } from "@services/memo-services/repositories/prisma";
import { MemosCreateUseCase, MemosGetUseCase, MemosDeleteUseCase, MemosUpdateUseCase } from "@services/memo-services/use-cases";

export class MemoFactories {
    private prismaMemosRepository  = new PrismaMemosRepository()

    makeMemosCreateUseCase() {
        const  memosCreateUseCase = new MemosCreateUseCase(this.prismaMemosRepository)
        return memosCreateUseCase
    }

    makeMemosUpdateUseCase() {
        const  memosUpdateUseCase = new MemosUpdateUseCase(this.prismaMemosRepository)
        return memosUpdateUseCase
    }

    makeMemosGetUseCase() {
        const  memosGetUseCase = new MemosGetUseCase(this.prismaMemosRepository)
        return memosGetUseCase
    }

    makeMemosDeleteUseCase() {
        const  memosDeleteUseCase = new MemosDeleteUseCase(this.prismaMemosRepository)
        return memosDeleteUseCase
    }
}
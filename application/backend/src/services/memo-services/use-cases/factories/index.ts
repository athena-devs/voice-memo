import { PrismaMemosRepository } from "@services/memo-services/repositories/prisma";
import { MemosCreateUseCase, MemoGetUseCase, MemosGetAllUseCase, MemosDeleteUseCase, MemosUpdateUseCase } from "@services/memo-services/use-cases";

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

    makeMemosGetAllUseCase() {
        const  memoGetUseCase = new MemosGetAllUseCase(this.prismaMemosRepository)
        return memoGetUseCase
    }


    makeMemoGetUseCase() {
        const  memoGetUseCase = new MemoGetUseCase(this.prismaMemosRepository)
        return memoGetUseCase
    }

    makeMemosDeleteUseCase() {
        const  memosDeleteUseCase = new MemosDeleteUseCase(this.prismaMemosRepository)
        return memosDeleteUseCase
    }
}
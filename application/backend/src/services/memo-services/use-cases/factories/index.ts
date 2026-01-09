import { PrismaMemosRepository } from "@services/memo-services/repositories/prisma";
import { MemosCreateUseCase, MemoGetUseCase, MemosGetAllUseCase, MemosDeleteUseCase, MemosUpdateUseCase } from "@services/memo-services/use-cases";
import { tracer } from "@shared/tracer";

export class MemoFactories {
    private prismaMemosRepository  = new PrismaMemosRepository()

    makeMemosCreateUseCase() {
        const  memosCreateUseCase = new MemosCreateUseCase(this.prismaMemosRepository)
        return tracer("memos-create-use-case", memosCreateUseCase)
    }

    makeMemosUpdateUseCase() {
        const  memosUpdateUseCase = new MemosUpdateUseCase(this.prismaMemosRepository)
        return tracer("memos-update-use-case", memosUpdateUseCase)
    }

    makeMemosGetAllUseCase() {
        const  memoGetUseCase = new MemosGetAllUseCase(this.prismaMemosRepository)
        return tracer("memos-getAll-use-case", memoGetUseCase)
    }


    makeMemoGetUseCase() {
        const  memoGetUseCase = new MemoGetUseCase(this.prismaMemosRepository)
        return tracer("memos-get-use-case", memoGetUseCase)
    }

    makeMemosDeleteUseCase() {
        const  memosDeleteUseCase = new MemosDeleteUseCase(this.prismaMemosRepository)
        return tracer("memos-delete-use-case", memosDeleteUseCase)
    }
}
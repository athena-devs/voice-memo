import { VerifyData } from "@shared/zod";
import { Request, Response } from "express";
import { MemoFactories } from "@services/memo-services/use-cases/factories";

export class MemoController {
    private data = new VerifyData()
    private factory = new MemoFactories()

    createMemo = async (request: Request, response: Response) => {
        const createMemo = this.factory.makeMemosCreateUseCase()
        const parsedMemo = this.data.verify_memo(request.body)
        const memo = await createMemo.execute(parsedMemo)

        return response.status(201).send(memo)
    }

    getMemo = async (request: Request, response: Response) => {
        const getMemo = this.factory.makeMemosGetUseCase()
        const { id } = this.data.verify_id(request.params.id)
        const memo = await getMemo.execute(id)

        return response.status(200).send(memo)
    }

    updateMemo = async (request: Request, response: Response) => {
        const updateMemo = this.factory.makeMemosUpdateUseCase()
        const parsedMemo = this.data.verify_memo(request.body)
        const { id } = this.data.verify_id(request.params.id)
        const memo = await updateMemo.execute(id, parsedMemo)

        return response.status(200).send(memo)
    }

    deleteMemo = async (request: Request, response: Response) => {
        const deleteMemo = this.factory.makeMemosDeleteUseCase()
        const { id } = this.data.verify_id(request.params.id)

        await deleteMemo.execute(id)
        return response.status(200)
    }
}

import { VerifyData } from "@shared/zod";
import { Request, Response } from "express";
import { MemoFactories } from "@services/memo-services/use-cases/factories";
import { AppError } from "@shared/app-error";

export class MemoController {

    private readonly data : VerifyData
    private readonly factory:  MemoFactories

    constructor( 
        data: VerifyData = new VerifyData(), factory: MemoFactories = new MemoFactories
    ) {
        this.data = data
        this.factory = factory
    }

    createMemo = async (request: Request, response: Response) => {
        const { file, user } = request
        if (file && user) {
            const createMemo = this.factory.makeMemosCreateUseCase()
            const parsedMemo = this.data.verifyFile(file)
            const memo = await createMemo.execute({
                filePath: parsedMemo.path,
                userId: user.id,
                mimetype: file.mimetype
            })
         
            return response.status(201).send(memo)
        }else {
            return new AppError("No audio file provided", 404)
        }
    }

    getMemo = async (request: Request, response: Response) => {
        const getMemo = this.factory.makeMemosGetUseCase()
        const { id } = this.data.verifyId(request.params.id)
        const memo = await getMemo.execute(id)

        return response.status(200).send(memo)
    }

    updateMemo = async (request: Request, response: Response) => {
        const updateMemo = this.factory.makeMemosUpdateUseCase()
        const parsedMemo = this.data.verifyMemoUpdate(request.body)
        const { id } = this.data.verifyId(request.params.id)
        const memo = await updateMemo.execute(id, parsedMemo)

        return response.status(200).send(memo)
    }

    deleteMemo = async (request: Request, response: Response) => {
        const deleteMemo = this.factory.makeMemosDeleteUseCase()
        const { id } = this.data.verifyId(request.params.id)

        await deleteMemo.execute(id)
        return response.status(204)
    }
}

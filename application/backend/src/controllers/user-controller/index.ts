import { VerifyData } from "@shared/zod";
import { Request, Response } from "express";
import { UserFactory } from "@services/user-services/use-cases/factories";

export class UserController {
    private data : VerifyData
    private factory:  UserFactory

    constructor( 
        data: VerifyData = new VerifyData(), factory: UserFactory = new UserFactory
    ) {
        this.data = data
        this.factory = factory
    }
    
    createUser = async (request: Request, response: Response) => {
        const createUser = this.factory.makeUsersCreateUseCase()
        const parsedUser = this.data.verifyUser(request.body)
        const user = await createUser.execute(parsedUser)
        
        return response.status(201).send(user)
    }

    getUser = async (request: Request, response: Response) => {
        const getUser = this.factory.makeUsersGetUseCase()
        const { id } = this.data.verifyId(request.params.id)
        const user = await getUser.execute(request.params.id)
        
        return response.status(200).send(user)
    }

    updateUser = async (request: Request, response: Response) => {
        const updateUser = this.factory.makeUsersUpdateUseCase()
        const parsedUser = this.data.verifyUser(request.body)
        const { id } = this.data.verifyId(request.params.id)
        const user = await updateUser.execute(id, parsedUser)
        
        return response.status(200).send(user)
    }

    deleteUser = async (request: Request, response: Response) => {
        const deleteUser = this.factory.makeUsersDeleteUseCase()
        const { id } = this.data.verifyId(request.params.id)

        await deleteUser.execute(id)
        return response.status(200)
    }
}
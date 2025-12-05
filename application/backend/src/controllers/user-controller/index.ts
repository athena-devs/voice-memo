import { VerifyData } from "@shared/zod";
import { Request, Response } from "express";
import { UserFactory } from "@services/user-services/use-cases/factories";

export class UserController {
    private data = new VerifyData()
    private factory = new UserFactory()
    
    async createUser(request: Request, response: Response) {
        const createUser = this.factory.makeUsersCreateUseCase()
        const parsedUser = this.data.verify_user(request.body)
        const user = await createUser.execute(parsedUser)
        
        return response.status(201).send(user)
    }

    async getUser(request: Request, response: Response) {
        const getUser = this.factory.makeUsersGetUseCase()
        const { id } = this.data.verify_id(request.params.id)
        const user = await getUser.execute(id)
        
        return response.status(200).send(user)
    }

    async updateUser(request: Request, response: Response) {
        const updateUser = this.factory.makeUsersUpdateUseCase()
        const parsedUser = this.data.verify_user(request.body)
        const { id } = this.data.verify_id(request.params.id)
        const user = await updateUser.execute(id, parsedUser)
        
        return response.status(200).send(user)
    }

    async deleteUser(request: Request, response: Response) {
        const deleteUser = this.factory.makeUsersDeleteUseCase()
        const { id } = this.data.verify_id(request.params.id)

        await deleteUser.execute(id)
        return response.status(200)
    }
}
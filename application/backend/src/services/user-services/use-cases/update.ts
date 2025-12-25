import { AppError } from "@shared/app-error";
import { UsersRepository } from "../repositories";
import { IResponseFmt, responseFormat } from "@shared/response-format";
import {IUserResponseDTO } from "@models/user";

export class UsersUpdateUseCase {
    constructor(private usersRepository: UsersRepository) {
        this.usersRepository = usersRepository
    }
  
    async execute(data:  IUserResponseDTO): Promise<IResponseFmt | AppError> {
        const { id } = data
        const user = await this.usersRepository.getUser(id)

        if (!user) {
            throw new AppError("User not found!", 404)        
        }
        
        const payload = await this.usersRepository.updateUser(id, data)
        
        return responseFormat({
            data: payload, 
            message: "User deleted",
            statusCode: 200

        })
    }
}
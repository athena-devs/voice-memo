import { AppError } from "@shared/app-error";
import { UsersRepository } from "../repositories";
import { IResponseFmt, responseFormat } from "@shared/response-format";

export class UsersDeleteUseCase {
    constructor(private usersRepository: UsersRepository) {
        this.usersRepository = usersRepository
    }
  
    async execute(id: string): Promise<IResponseFmt | AppError> {
        const user = await this.usersRepository.getUser(id)

        if (!user) {
            throw new AppError("User not found!", 404)        
        }

        const payload = await this.usersRepository.deleteUser(id)
        
        return responseFormat({
            data: payload, 
            message: "User deleted",
            statusCode: 200

        })
    }
}
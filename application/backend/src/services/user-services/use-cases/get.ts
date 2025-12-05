import { AppError } from "@shared/app-error";
import { UsersRepository } from "../repositories";
import { IResponseFmt, responseFormat } from "@shared/response-format";

export class UsersGetUseCase {
    constructor(private usersRepository: UsersRepository) {
        console.log("Here")
        this.usersRepository = usersRepository
    }
  
    async execute(id: string): Promise<IResponseFmt | AppError> {
        const payload = await this.usersRepository.getUser(id)
        
        if (!payload) {
            throw new AppError("User not found!", 404)
        }

        return responseFormat({
            data: payload, 
            message: "User retrivied succesfully",
            statusCode: 200

        })
    }
}
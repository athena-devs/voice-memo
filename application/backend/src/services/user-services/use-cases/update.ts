import { AppError } from "@shared/app-error";
import { UsersRepository } from "../repositories";
import { IResponseFmt, responseFormat } from "@shared/response-format";
import { IUserUpdateDTO } from "@models/user";
import { generateHashPassword } from "@shared/encrypt";

export class UsersUpdateUseCase {
    constructor(private usersRepository: UsersRepository) {
        this.usersRepository = usersRepository
    }
  
    async execute(id: string, data:  IUserUpdateDTO): Promise<IResponseFmt | AppError> {
        const user = await this.usersRepository.getUser(id)

        if (!user) {
            throw new AppError("User not found!", 404)        
        }

        const dataToUpdate = { ...data }

        if (data.password) {
            dataToUpdate.password = await generateHashPassword(data.password)
        }
        
        const payload = await this.usersRepository.updateUser(id, dataToUpdate)
        
        return responseFormat({
            data: payload, 
            message: "User updated",
            statusCode: 200

        })
    }
}
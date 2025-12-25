import { IUser } from "@models/user";
import { UsersRepository } from "../repositories";
import { generateHashPassword } from "@shared/encrypt";
import { IResponseFmt, responseFormat } from "@shared/response-format";
import { AppError } from "@shared/app-error";

export class UsersCreateUseCase {
    constructor(private usersRepository: UsersRepository)  {
        this.usersRepository = usersRepository
    }
  
    async execute(data: IUser): Promise<IResponseFmt | AppError> {
        const hashedPassword = await generateHashPassword(data.password)
        const user = await this.usersRepository.createUser({...data, password: hashedPassword})

        if (!user) {
            throw new AppError("User not found!", 404)        
        }
        
        return responseFormat({
            statusCode: 201,
            message: "User created successfully"
        })
    }
}
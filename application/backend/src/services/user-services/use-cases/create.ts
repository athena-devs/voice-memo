import { IUser } from "@models/user";
import { UsersRepository } from "../repositories";

export class UsersCreateUseCase {
    constructor(private usersRepository: UsersRepository) {
        this.usersRepository = usersRepository
    }
  
    async execute(data: IUser): Promise<IUser> {
        const user = await this.usersRepository.createUser(data)
        return user
    }
}
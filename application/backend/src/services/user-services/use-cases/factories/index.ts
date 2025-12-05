import { PrismaUsersRepository } from "@services/user-services/repositories/prisma";
import { UsersCreateUseCase, UsersGetUseCase, UsersDeleteUseCase, UsersUpdateUseCase } from "@services/user-services/use-cases";

export class UserFactory{
    private prismaUsersRepository  = new PrismaUsersRepository()
            
    makeUsersCreateUseCase() {
        const  usersCreateUseCase = new UsersCreateUseCase(this.prismaUsersRepository)
        return usersCreateUseCase
    }

    makeUsersUpdateUseCase() {
        const  usersUpdateUseCase = new UsersUpdateUseCase(this.prismaUsersRepository)
        return usersUpdateUseCase
    }

    makeUsersGetUseCase() {
        const  usersGetUseCase = new UsersGetUseCase(this.prismaUsersRepository)
        return usersGetUseCase
    }

    makeUsersDeleteUseCase() {
        const  usersDeleteUseCase = new UsersDeleteUseCase(this.prismaUsersRepository)
        return usersDeleteUseCase
    }
}
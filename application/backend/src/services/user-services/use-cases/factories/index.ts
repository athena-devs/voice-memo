import { PrismaUsersRepository } from "@services/user-services/repositories/prisma";
import { UsersCreateUseCase, UsersGetUseCase, UsersDeleteUseCase, UsersUpdateUseCase } from "@services/user-services/use-cases";
import { tracer } from "@shared/tracer";

export class UserFactory{
    private prismaUsersRepository  = new PrismaUsersRepository()
    
    makeUsersCreateUseCase() {
        const  usersCreateUseCase = new UsersCreateUseCase(this.prismaUsersRepository)
        return tracer("users-create-use-case", usersCreateUseCase)
    }
    
    makeUsersUpdateUseCase() {
        const  usersUpdateUseCase = new UsersUpdateUseCase(this.prismaUsersRepository)
        return tracer("users-update-use-case", usersUpdateUseCase)
    }
    
    makeUsersGetUseCase() {
        const  usersGetUseCase = new UsersGetUseCase(this.prismaUsersRepository)
        return tracer("users-get-use-case", usersGetUseCase)
    }

    makeUsersDeleteUseCase() {
        const  usersDeleteUseCase = new UsersDeleteUseCase(this.prismaUsersRepository)
        return tracer("users-delete-use-case", usersDeleteUseCase)
    }
}
import { PrismaUsersRepository } from "@services/user-services/repositories/prisma";
import { LoginGoogleUseCase } from "@services/auth-services/use-cases/login-google";
import { LoginEmailUseCase } from "@services/auth-services/use-cases/login-email";


export class AuthFactory{
    private prismaUsersRepository  = new PrismaUsersRepository()
    
    makeLoginGoogleUseCase() {
        const  loginGoogleUseCase = new LoginGoogleUseCase(this.prismaUsersRepository)
        return loginGoogleUseCase
    }
    
    makeLoginEmailUseCase() {
        const  loginEmailUseCase = new LoginEmailUseCase(this.prismaUsersRepository)
        return loginEmailUseCase
    }
}
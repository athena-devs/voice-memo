import { PrismaUsersRepository } from "@services/user-services/repositories/prisma";
import { LoginGoogleUseCase } from "@services/auth-services/use-cases/login-google";
import { LoginEmailUseCase } from "@services/auth-services/use-cases/login-email";
import { tracer } from "@shared/tracer";

export class AuthFactory{
    private prismaUsersRepository  = new PrismaUsersRepository()
    
    makeLoginGoogleUseCase() {
        const  loginGoogleUseCase = new LoginGoogleUseCase(this.prismaUsersRepository)
        return tracer("login-google-use-case",loginGoogleUseCase)
    }
    
    makeLoginEmailUseCase() {
        const  loginEmailUseCase = new LoginEmailUseCase(this.prismaUsersRepository)
        return tracer("login-email-use-case", loginEmailUseCase)
    }

}
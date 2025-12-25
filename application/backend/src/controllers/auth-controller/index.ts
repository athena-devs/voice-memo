import { VerifyData } from "@shared/zod";
import { Request, Response } from "express";
import { GoogleAuth } from "@shared/google-auth";
import { AuthFactory } from "@services/auth-services/use-cases/factories";

export class AuthController {
    private readonly data : VerifyData
    private readonly google: GoogleAuth
    private readonly factory:  AuthFactory
    
    constructor() {
        this.data = new VerifyData()
        this.google = new GoogleAuth()
        this.factory = new AuthFactory()
    }

    emailLogin = async (request: Request, response: Response) => {
        const loginUser = this.factory.makeLoginEmailUseCase()
        const parsedUser = this.data.verifyUser(request.body) 
        const user = await loginUser.execute(parsedUser)

        return response.status(200).send(user)
    }

    googleLogin = async (request: Request, response: Response) => {
        const { code } = request.body
        const loginGoole = this.factory.makeLoginGoogleUseCase()
        const parsedGoogle = this.data.verifyGoogleLogin(code)
        const login = await loginGoole.execute(parsedGoogle)

        return response.status(200).send(login)
    }
}
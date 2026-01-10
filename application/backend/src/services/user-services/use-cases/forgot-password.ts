import { AppError } from "@shared/app-error";
import { UsersRepository } from "../repositories";
import { IResponseFmt, responseFormat } from "@shared/response-format";
import { randomBytes } from "crypto";
import { MailClient } from "@config/mail-client";
import { template } from "@shared/mail";

export class UsersForgotPasswordUseCase {
    private readonly mail: MailClient
    
    constructor(private usersRepository: UsersRepository, private mailClient: MailClient = new MailClient) {
        this.usersRepository = usersRepository
        this.mail = mailClient
    }
  
    async execute(email: string): Promise<IResponseFmt | AppError> {
        const user = await this.usersRepository.findByEmail(email)
        
        if (!user) {
            throw new AppError("User not found!", 404)
        }

        // Generate a random 6 char code
        const buffer = randomBytes(3)
        const hexString = buffer.toString('hex')
        const code = hexString.slice(0, 6)
        
        // Send mail
        const html = template(user.name, code)
        this.mail.sendMail(email, "", html)

        // Give response with code to front-end
        const payload = {user: user, code: code}

        return responseFormat({
            data: payload, 
            message: "User retrivied succesfully",
            statusCode: 200
        })
    }
}
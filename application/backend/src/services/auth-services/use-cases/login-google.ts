import { UsersRepository } from "@services/user-services/repositories";
import { GoogleAuth } from "@shared/google-auth";
import { AppError } from "@shared/app-error";
import { sign } from "jsonwebtoken";
import { env } from "@shared/env";
import { IRequestDTO } from "@models/auth";
import { responseFormat } from "@shared/response-format";
import { IUser, IUserResponseDTO } from "@models/user";


export class LoginGoogleUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(data: IRequestDTO ) {
    const payload = await GoogleAuth.verifyGoogleToken(data.code);
    let user : IUser | IUserResponseDTO | null;

    if (!payload || !payload.email) {
      throw new AppError("Invalid Google Token", 401);
    }

    user = await this.usersRepository.findByEmail(payload.email);

    if (!user) {
        user = await this.usersRepository.createUser({
            name: payload.name || "Google User",
            email: payload.email,
            password: "",
        });
    }

    const token = sign(
      {
        sub: user.id, 
        id: user.id,
        email: user.email,
        name: user.name 
      }, 
      env.JWT_SECRET, 
      { expiresIn: env.JWT_EXPIRES_IN, algorithm: "HS256" }
    );

    const payloadUser = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };

    return responseFormat({
        data: payloadUser, 
        message: "User retrivied succesfully",
        statusCode: 200
    })
  }
}
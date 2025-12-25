import { UsersRepository } from "@services/user-services/repositories";
import { GoogleAuth } from "@shared/google-auth";
import { AppError } from "@shared/app-error";
import { sign } from "jsonwebtoken";
import { env } from "@shared/env";
import { IRequestDTO } from "@models/auth";


export class LoginGoogleUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(data: IRequestDTO ) {
    const payload = await GoogleAuth.verifyGoogleToken(data.code);

    if (!payload || !payload.email) {
      throw new AppError("Invalid Google Token", 401);
    }

    let user = await this.usersRepository.findByEmail(payload.email);

    if (!user) {
        user = await this.usersRepository.createUser({
            name: payload.name || "Google User",
            email: payload.email,
            password: "",
        });
    }

    const token = sign(user, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN, algorithm: "HS256"})

    return {
      user,
      token,
    };
  }
}
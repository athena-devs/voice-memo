import { IUserDTO } from "@models/auth";
import { UsersRepository } from "@services/user-services/repositories";
import { sign } from "jsonwebtoken";
import { env } from "@shared/env";
import { AppError } from "@shared/app-error";
import { compareHashPasswords } from "@shared/encrypt";
import { responseFormat } from "@shared/response-format";

export class LoginEmailUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(data: IUserDTO) {
    const user = await this.usersRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError("Email or password incorrect", 401);
    }
    const passwordMatch = await compareHashPasswords(data.password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect", 401);
    }

    const token = sign(
      { 
        email: user.email,
        name: user.name 
      }, 
      env.JWT_SECRET, 
      { expiresIn: env.JWT_EXPIRES_IN, algorithm: "HS256" }
    );

    const payload = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return responseFormat({
        data: payload, 
        message: "User retrivied succesfully",
        statusCode: 200
    })
  }
}
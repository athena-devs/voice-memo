import { IUserDTO } from "@models/auth";
import { UsersRepository } from "@services/user-services/repositories";
import { sign } from "jsonwebtoken";
import { env } from "@shared/env";

export class LoginEmailUseCase {
  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(data: IUserDTO) {

    let user = await this.usersRepository.findByEmail(data.email);

    if (!user) {
        user = await this.usersRepository.createUser({
            name: "",
            email: data.email,
            password: data.password,
        });
    }

    const token = sign(user, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN, algorithm: "HS256"})

    return {
      user,
      token,
    };
  }
}
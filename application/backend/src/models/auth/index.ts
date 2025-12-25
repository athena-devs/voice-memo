import { JwtPayload } from "jsonwebtoken";

export interface IUserDTO {
    email: string
    password: string
}

export interface IRequestDTO {
    code: string
}

export interface IToken extends JwtPayload {
  email: string;
  name: string;
}
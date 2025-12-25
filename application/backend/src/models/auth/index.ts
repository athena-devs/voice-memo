import { JwtPayload } from "jsonwebtoken";

export interface IRequestDTO {
    code: string
}

export interface IToken extends JwtPayload {
  email: string;
  name: string;
}
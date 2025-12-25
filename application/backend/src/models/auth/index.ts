import { JwtPayload } from "jsonwebtoken";

export interface IRequestDTO {
    code: string
}

export interface IToken extends JwtPayload {
  id: string;
  email: string;
  name: string;
}
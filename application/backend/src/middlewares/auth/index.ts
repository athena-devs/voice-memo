import { errorHandler } from "@middlewares/error-handler";
import { IToken } from "@models/auth";
import { AppError } from "@shared/app-error";
import { env } from "@shared/env";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: IToken;
    }
  }
}

export const auth =  async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    errorHandler(new AppError("Token not provided", 401), request, response, next)
  } else {
    try {
      const tokenWithoutBearer = authHeader.split(" ")[1];

      jwt.verify(tokenWithoutBearer, env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
          return errorHandler(new AppError("Invalid token ", 401), request, response, next)
        }

        request.user = decoded as IToken
        // If OK keep going
        next();
      });
    } catch (err: any) {
      return errorHandler(new AppError(`Invalid authentication: ${err}`, 401), request, response, next)
    }
  }
};
import { errorHandler } from "@middlewares/error-handler";
import { AppError } from "@shared/app-error";
import { env } from "@shared/env";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

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

      jwt.verify(tokenWithoutBearer, env.JWT_SECRET as string, (err: any) => {
        if (err) {
          return errorHandler(new AppError("Invalid token ", 401), request, response, next)
        }
        // If OK keep going
        next();
      });
    } catch (err: any) {
      return errorHandler(new AppError(`Invalid authentication: ${err}`, 401), request, response, next)
    }
  }
};
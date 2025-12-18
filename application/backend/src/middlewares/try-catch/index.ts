import { errorHandler } from "@middlewares/error-handler";
import { AppError } from "@shared/app-error";
import { NextFunction, Request, Response } from "express";

export const tryCatch =
  (controller: any) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await controller(request, response);
    } catch (err: any) {
      next(errorHandler(new AppError(`Invalid data or access: ${err}`, 403 ), request, response, next));
    }
  };
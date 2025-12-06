import { UserController } from "@controllers/user-controller";
import { tryCatch } from "@middlewares/try-catch";
import { Router } from "express";

const user = new UserController()

export const userUnprotectedRoutes = Router()
.post('/', tryCatch(user.createUser))
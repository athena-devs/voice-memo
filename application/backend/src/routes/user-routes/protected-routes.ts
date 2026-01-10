import { UserController } from "@controllers/user-controller";
import { auth } from "@middlewares/auth";
import { tryCatch } from "@middlewares/try-catch";
import { Router } from "express";

const user = new UserController()

export const userRoutes = Router()

userRoutes.use(tryCatch(auth))
.post('/forgot-password/', tryCatch(user.forgotPassword))
.get('/:id', tryCatch(user.getUser))
.patch('/:id', tryCatch(user.updateUser))
.delete('/:id', tryCatch(user.deleteUser))
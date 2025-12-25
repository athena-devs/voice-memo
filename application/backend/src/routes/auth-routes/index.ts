import { AuthController } from "@controllers/auth-controller";
import { tryCatch } from "@middlewares/try-catch";
import { Router } from "express";

const auth = new AuthController()

export const authRoutes = Router()
.post('/google', tryCatch(auth.googleLogin))
.post('/email', tryCatch(auth.emailLogin))
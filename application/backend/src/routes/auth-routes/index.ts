import { AuthController } from "@controllers/auth-controller";
import { tryCatch } from "@middlewares/try-catch";
import { rateLimiter } from "@middlewares/rate-limiter";
import { Router } from "express";

const auth = new AuthController()

export const authRoutes = Router()
.post('/google', tryCatch(auth.googleLogin))
.post('/email', rateLimiter.auth, tryCatch(auth.emailLogin))
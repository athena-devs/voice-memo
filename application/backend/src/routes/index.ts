import { Router } from "express";
import { userRoutes, userUnprotectedRoutes } from "@routes/user-routes";
import { memoRoutes } from "@routes/memo-routes";
import { authRoutes } from "./auth-routes";

export const appRouter = Router()
appRouter.use('/voice-memo/users', userUnprotectedRoutes)
appRouter.use('/voice-memo/users', userRoutes)
appRouter.use('/voice-memo/memos', memoRoutes)
appRouter.use('/voice-memo/auth', authRoutes)

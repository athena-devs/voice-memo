import { Router } from "express";
import { userRoutes, userUnprotectedRoutes } from "@routes/user-routes";
import { memoRoutes } from "@routes/memo-routes";

export const appRouter = Router()
appRouter.use('/users', userUnprotectedRoutes)
appRouter.use('/users', userRoutes)
appRouter.use(`/memos`, memoRoutes)

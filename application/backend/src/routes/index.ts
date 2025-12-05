import { Router } from "express";
import { userRoutes, userUnprotectedRoutes } from "@routes/user-routes";
import { memoRoutes, memoUnprotectedRoutes } from "@routes/memo-routes";

export const appRouter = Router()
appRouter.use('/users', userUnprotectedRoutes)
appRouter.use('/users', userRoutes)
appRouter.use(`/memo`, memoRoutes)
appRouter.use('/memo', memoUnprotectedRoutes)
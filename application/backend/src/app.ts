import { env } from '@shared/env'
import express from 'express'
import cors from "cors"
import { appRouter } from './routes/index'
import { errorHandler } from '@middlewares/error-handler'
import { MemosWorker } from "@workers/memos-worker";
import { rateLimiter } from "@middlewares/rate-limiter";
import { notFound } from '@middlewares/not-found'

const worker = new MemosWorker()
const app = express()
app.set('trust proxy', 1);
app.use(rateLimiter.global)
app.use(express.json())
app.use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true
}));
app.use(appRouter)
app.use(errorHandler)
app.use(notFound)

export { app, worker }
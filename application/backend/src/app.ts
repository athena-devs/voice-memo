import { env } from '@shared/env'
import express from 'express'
import cors from "cors"
import { appRouter } from './routes/index'
import { errorHandler } from '@middlewares/error-handler'


const app = express()
app.use(express.json())
app.use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true
}));
app.use(appRouter)
app.use(errorHandler)

export { app }
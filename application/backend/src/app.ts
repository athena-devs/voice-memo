import { env } from '@shared/env'
import express from 'express'
import cors from "cors"
import { appRouter } from './routes/index'
import { TelemetryClient } from '@config/telemetry-client'
import { errorHandler } from '@middlewares/error-handler'

const telemetry = new TelemetryClient() 
telemetry.start()

const app = express()
app.use(express.json())
app.use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true
}));
app.use(appRouter)
app.use(errorHandler)

app.listen(env.PORT, () => { console.log(`Server is running at http://localhost:${env.PORT}`) })
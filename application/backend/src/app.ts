import { env } from '@shared/env'
import express from 'express'
import cors from "cors"
import { appRouter } from './routes/index'

const app = express()
app.use(express.json())
app.use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true
}));
app.use(appRouter)

app.listen(env.PORT, () => { console.log(`Server is running at http://localhost:${env.PORT}`) })
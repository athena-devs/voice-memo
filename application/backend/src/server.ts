import { TelemetryClient } from '@config/telemetry-client'
import { env } from '@shared/env'

const telemetry = new TelemetryClient() 
telemetry.start()

async function bootstrap() {
    const { app, worker } = await import('./app')

    app.listen(env.PORT, () => { 
        console.log(`Server is running at http://localhost:${env.PORT}`) 
        
        worker.transcriptionWorker()
        console.log("🚀 Background Worker started")
    })
}

bootstrap()
import { TelemetryClient } from '@config/telemetry-client'
const telemetry = new TelemetryClient() 
telemetry.start()

import { app } from './app'
import { env } from '@shared/env'

app.listen(env.PORT, () => { 
    console.log(`Server is running at http://localhost:${env.PORT}`) 
})
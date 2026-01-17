import { Queue } from "bullmq";
import { env } from "@shared/env";
import { ITranscriptionJobData } from "@models/memo";

export class MqClient {
    private readonly connection = { host: env.MQ_HOST, port: env.MQ_PORT };
    public readonly transcriptionQueue: Queue;

    constructor() {
        this.transcriptionQueue = new Queue('transcription-queue', { connection: this.connection });
    }

    async sendToTranscription(data: ITranscriptionJobData) {
        await this.transcriptionQueue.add('transcribe', data);
    }
}
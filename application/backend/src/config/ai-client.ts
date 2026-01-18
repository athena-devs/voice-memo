import { AppError } from "@shared/app-error";
import { env } from '@shared/env'
import Groq, { toFile } from "groq-sdk";
import { ITranscripitonMemo } from "@models/memo";

export class AIClient {
    private readonly groq: Groq

    constructor() {
        this.groq = new Groq({apiKey: env.API_KEY,}) 
    }

    async createAudioDescription(data: ITranscripitonMemo){
        try {
            // Join stream chunks in a buffer 
            const streamToBuffer = async (stream: any): Promise<Buffer> => {
                const chunks = [];
                for await (const chunk of stream) {
                    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
                }
                return Buffer.concat(chunks);
            };

            const buffer = await streamToBuffer(data.file);
            
            // Generate a file to AI api
            const outputFile = await toFile(buffer, 'audio-file.mp3');

            const transcripiton = await this.groq.audio.transcriptions.create({
                file: outputFile,
                model: data.model,
                response_format: data.responseFormat,
                language: data.language
            })

            return transcripiton
        } catch (err) {
            throw new AppError(`An error happened fetching transcription api: ${err}`, 500)
        } 
    }
}
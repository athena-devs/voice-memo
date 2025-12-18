import { AppError } from "@shared/app-error";
import { env } from '@shared/env'
import Groq from "groq-sdk";
import { ITranscrpitonMemo } from "@models/memo";

export class AIClient {
    private readonly groq: Groq

    constructor() {
        this.groq = new Groq({apiKey: env.API_KEY,}) 
    }

    async createAudioDescription(data: ITranscrpitonMemo){
        try {
            const transcripiton = await this.groq.audio.transcriptions.create({
                file: data.file,
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
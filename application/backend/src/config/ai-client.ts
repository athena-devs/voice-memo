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

            const rawTranscription = await this.groq.audio.transcriptions.create({
                file: outputFile,
                model: data.model || "whisper-large-v3",
                response_format: data.responseFormat || "json",
                language: data.language
            })

            const rawText = rawTranscription.text

            const tuneTranscription = await this.groq.chat.completions.create({
                model: "llama-3.1-8b-instant",
                messages: [
                    {   role: "system", 
                        content: `Você é um editor especialista.
                        Analise a transcrição abaixo.
                        Retorne APENAS um JSON válido com a seguinte estrutura, sem explicações adicionais:
                        {
                            "titulo": "Um título curto e relevante",
                            "resumo_md": "Um resumo formatado em markdown",
                            "action_items": ["Array de strings com tarefas ou pontos chave"]
                        }`
                    },
                    { 
                        role: "user", 
                        content: rawText // Passamos a string limpa
                    }
                ],
                response_format: { type: "json_object" },
                temperature: 0.2
            })

            const jsonContent = tuneTranscription.choices[0]?.message?.content

            if (!jsonContent) {
                throw new AppError("Failed to generate refined content from AI", 500);
            }

            const parsedContent = JSON.parse(jsonContent)

            return {
                title: parsedContent.titulo,
                summary_md: parsedContent.resumo_md,
                action_items: parsedContent.action_items || [],
                raw_text: rawText
            }
            
        } catch (err) {
            throw new AppError(`An error happened fetching transcription api: ${err}`, 500)
        } 
    }
}
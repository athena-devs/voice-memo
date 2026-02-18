import { AppError } from "@shared/app-error";
import { env } from '@shared/env'
import Groq, { toFile } from "groq-sdk";
import { ITranscripitonMemo } from "@models/memo";
import { logger } from "@shared/logger";

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
            
            // Check for not empty buffers
            if (buffer.length === 0) {
                throw new AppError("Audio file buffer is empty after download", 400);
            }

            // Generate a file to AI api
            const outputFile = await toFile(buffer, 'audio-file.mp3', {type: 'audio/mpeg'});

            const rawTranscription = await this.groq.audio.transcriptions.create({
                file: outputFile,
                model: data.model || "whisper-large-v3",
                response_format: data.responseFormat || "json",
                language: data.language
            })

            const rawText = rawTranscription.text
            
            // If is not audible
            if (!rawText || rawText.trim().length === 0) {
                 return {
                    title: "No content",
                    summary_md: "Unable to detect voice on audio",
                    action_items: [],
                    raw_text: ""
                }
            }

            // Tune audio
            const tuneTranscription = await this.groq.chat.completions.create({
                model: "llama-3.1-8b-instant",
                messages: [
                    {   role: "system", 
                        content: `You are an expert editor.
                            Analyze the transcript below.
                            Return ONLY a valid JSON with the following structure, without additional explanations:

                            {
                             "title": "A short and relevant title",

                             "summary_md": "A summary formatted in markdown",

                             "action_items": ["Array of strings with tasks or key points"]

                            }`
                    },
                    { 
                        role: "user", 
                        content: rawText
                    }
                ],
                response_format: { type: "json_object" },
                temperature: 0.2
            })

            const jsonContent = tuneTranscription.choices[0]?.message?.content

            if (!jsonContent) {
                logger.error("Failed to generate refined content from AI")
                throw new AppError("Failed to generate refined content from AI", 500);
            }

            let parsedContent;
            
            try {
                parsedContent = JSON.parse(jsonContent)
            } catch(err: any) {
                console.error("Failed to parse AI JSON response:", jsonContent);
                parsedContent = {
                    title: "Audio Summary",
                    summary_md: rawText,
                    action_items: []
                };
            }
            
            return {
                title: parsedContent.title || "No title",
                summary_md: parsedContent.summary_md || "",
                action_items: parsedContent.action_items || [],
                raw_text: rawText
            }

        } catch (err) {
            logger.error("An error happened fetching transcription api", err)
            throw new AppError(`An error happened fetching transcription api: ${err}`, 500)
        } 
    }
}
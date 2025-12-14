import { IMemo, ICreateMemoInput } from "@models/memo";
import { MemosRepository } from "../repositories";
import { Groq } from "groq-sdk";
import { env } from "@shared/env";
import { MIME_TO_EXT } from "@shared/convert-extension";
import { AppError } from "@shared/app-error";
import { FsClient } from "@config/fs-client";
import { MinioClient } from "@config/minio";

export class MemosCreateUseCase {
    constructor(private memosRepository: MemosRepository) {
        this.memosRepository = memosRepository
    }
  
    async execute(input: ICreateMemoInput): Promise<IMemo | AppError> {
        const groq = new Groq({apiKey: env.API_KEY})
        const filePath = input.filePath
        const mime = MIME_TO_EXT[input.mimetype]
        const streamPath = `${filePath}.${mime}`
        const minio = new MinioClient() 
        const fs = new FsClient()

        try {
            fs.rename(filePath, streamPath)
            const fileStream = fs.create(streamPath)

            // Transcription
            const transcripiton = await groq.audio.transcriptions.create({
                file: fileStream,
                model: "whisper-large-v3",
                response_format: "json",
                language: "pt"
            })
            
            // Create Memo
            const memo = await this.memosRepository.createMemo({
                path: input.filePath,
                summary: "",
                text: transcripiton.text,
                title: transcripiton.text.substring(0, 50) + "...",
                userId: input.userId
            })

            // Save on storage
            await minio.upload({
                filePath: input.filePath,
                mimetype: mime,
                userId: input.userId
            }) 

            // Unlink
            fs.delete(filePath, streamPath)

            return memo

        } catch (err: any) {
            fs.delete(filePath, streamPath)
            throw new AppError(`Internal Server Error: ${err}`, 500)
        }
    }
}
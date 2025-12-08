import { IMemo, ICreateMemoInput } from "@models/memo";
import { MemosRepository } from "../repositories";
import { Groq } from "groq-sdk";
import { env } from "@shared/env";
import fs from "fs";
import { MIME_TO_EXT } from "@shared/convert-extension";
import { AppError } from "@shared/app-error";

export class MemosCreateUseCase {
    constructor(private memosRepository: MemosRepository) {
        this.memosRepository = memosRepository
    }
  
    async execute(input: ICreateMemoInput): Promise<IMemo | AppError> {
        const groq = new Groq({apiKey: env.API_KEY})
        const filePath = input.filePath
        const mime = MIME_TO_EXT[input.mimetype]
        const streamPath = `${filePath}.${mime}`

        try {
            
            fs.renameSync(filePath, streamPath)
            const fileStream = fs.createReadStream(streamPath)

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

            // Unlink
            if (fs.existsSync(streamPath) && fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
                fs.unlinkSync(streamPath);
            }
            return memo

        } catch (err: any) {
            if (fs.existsSync(streamPath)) fs.unlinkSync(streamPath);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

            err = new AppError("Internal Server Error", 500)
            console.log("Here: ", err)
            return err
        }
    }
}
import { ITranscribeAudioInput } from "@models/memo";
import { MemosRepository } from "@services/memo-services/repositories";
import { AIClient } from "@config/ai-client";
import { MinioClient } from "@config/minio";
import { AppError } from "@shared/app-error";

export class MemosTranscribeAudioUseCase {
    constructor(
        private readonly memosRepository: MemosRepository,
        private readonly aiClient: AIClient = new AIClient(),
        private readonly minioClient: MinioClient = new MinioClient()
    ) {
        this.memosRepository = memosRepository
        this.aiClient = this.aiClient
        this.minioClient = this.minioClient 
    }

    async execute(data: ITranscribeAudioInput): Promise<void> {
        try {    
            // Download
            const fileStream = await this.minioClient.download(data.fileKey);

            // Transcribe
            const transcription = await this.aiClient.createAudioDescription({
                file: fileStream,
                model: "whisper-large-v3",
                responseFormat: "json",
                language: "pt"
            });

            // Update
            await this.memosRepository.updateMemo(data.memoId, {
                text: transcription.text,
                summary: transcription.text.substring(0, 50) + "...",
                status: "COMPLETED"
            });

        } catch (err) {
            throw new AppError(`Internal Server Error: ${err}`, 500)
        }
    }
}
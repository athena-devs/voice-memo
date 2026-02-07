import { ITranscribeAudioInput } from "@models/memo";
import { MemosRepository } from "@services/memo-services/repositories";
import { AIClient } from "@config/ai-client";
import { MinioClient } from "@config/minio";
import { AppError } from "@shared/app-error";
import { logger } from "@shared/logger";

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
                language: data.language
            });

            // Update
            await this.memosRepository.updateMemo(data.memoId, {
                title: transcription.title,
                text: transcription.raw_text,
                summary: transcription.summary_md,
                status: "COMPLETED"
            });

        } catch (err: any) {
            logger.error("Internal Server error", err)
            throw new AppError(`Internal Server Error: ${err}`, 500)
        }
    }
}       
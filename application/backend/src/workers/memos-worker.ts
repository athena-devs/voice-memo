import { Worker } from "bullmq";
import { env } from "@shared/env";
import { logger } from "@shared/logger";
import { PrismaMemosRepository } from "@services/memo-services/repositories/prisma";
import { ITranscriptionJobData } from "@models/memo";
import { MemoFactories } from "@services/memo-services/use-cases/factories";

export class MemosWorker {
    private readonly memosRepo = new PrismaMemosRepository();
    private readonly factory:  MemoFactories = new  MemoFactories()
    
    transcriptionWorker() {
        const worker = new Worker<ITranscriptionJobData>('transcription-queue', async (job) => {
            logger.info(`[Worker] Processing Job ${job.id}`);
            
            try {
                const transcription = this.factory.makeMemosTranscribeAudioUseCase()

                await transcription.execute({
                    memoId: job.data.memoId,
                    fileKey: job.data.fileKey
                });

                logger.info(`[Worker] Job ${job.id} OK`);

            } catch (err) {
                logger.error(`[Worker] Job ${job.id} Failed:`, err);
                
                await this.memosRepo.updateMemo(job.data.memoId, { status: "FAILED" });
                
                throw err; 
            }
        }, { 
            connection: { host: env.MQ_HOST, port: env.MQ_PORT },
            concurrency: 5
        });

        return worker;
    }
}
import { prisma } from "@config/prisma";
import { MemosRepository } from "@services/memo-services/repositories";
import { IMemo, IMemoUpdate } from "@models/memo";

export class PrismaMemosRepository implements MemosRepository {
    async createMemo(data: IMemo): Promise<IMemo> {
        const memo = await prisma.memo.create({
            data: {
                path: data.path,
                text: data.text,
                title: data.title,
                summary: data.summary,
                userId: data.userId
            }
        })

        return memo
    }
    
    async getMemo(id: string): Promise<IMemo | null> {
        const memo = await prisma.memo.findUnique({
            where: {id}
        })

        return memo
    }
    
    async updateMemo(id: string, data: IMemoUpdate): Promise<IMemo |  null> {
        const memo = await prisma.memo.update({
            where: {id},
            data: {
                text: data.text,
                title: data.title,
                summary: data.summary,
            }
        })
        
        return memo
    }

    async deleteMemo(id: string): Promise<void> {
        await prisma.memo.delete({
            where: {id}
        }) 
    }

}
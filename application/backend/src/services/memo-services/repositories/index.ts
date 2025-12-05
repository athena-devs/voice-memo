import { IMemo } from "@models/memo"

export interface MemosRepository {
    createMemo(data: IMemo): Promise<IMemo>
    getMemo(id: string): Promise<IMemo | null>
    updateMemo(id: string, data: IMemo): Promise<IMemo | null>
    deleteMemo(id: string | null): Promise<void>
}
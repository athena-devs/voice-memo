import { IMemo, IMemoUpdate } from "@models/memo"
import { AppError } from "@shared/app-error"

export interface MemosRepository {
    createMemo(data: IMemo): Promise<IMemo | AppError>
    getMemo(id: string): Promise<IMemo | null>
    updateMemo(id: string, data: IMemoUpdate): Promise<IMemo | null>
    deleteMemo(id: string | null): Promise<void>
}
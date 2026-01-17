import { IMemo, IMemoCreate, IMemoUpdate } from "@models/memo"
import { AppError } from "@shared/app-error"

export interface MemosRepository {
    createMemo(data: IMemoCreate): Promise<IMemo| AppError>
    getAllMemos(userId: string): Promise<IMemo[] | null>
    getMemo(id: string): Promise<IMemo | null>
    updateMemo(id: string, data: IMemoUpdate): Promise<IMemo | null>
    deleteMemo(id: string | null): Promise<void>
}
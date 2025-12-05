import { MemoController } from "@controllers/memo-controller";
import { tryCatch } from "@middlewares/try-catch";
import { Router } from "express";

const memo = new MemoController()

export const memoRoutes = Router()
.get('/:id', tryCatch(memo.getMemo))
.patch('/:id', tryCatch(memo.updateMemo))
.delete('/:id', tryCatch(memo.deleteMemo))


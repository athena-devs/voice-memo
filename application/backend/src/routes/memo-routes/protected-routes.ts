import { MemoController } from "@controllers/memo-controller";
import { tryCatch } from "@middlewares/try-catch";
import { Router } from "express";
import multer from 'multer';

const memo = new MemoController()
const upload = multer({ dest: 'uploads/'})
export const memoRoutes = Router()
.post('/', upload.single('audio'), tryCatch(memo.createMemo))
.get('/:id', tryCatch(memo.getMemo))
.patch('/:id', tryCatch(memo.updateMemo))
.delete('/:id', tryCatch(memo.deleteMemo))
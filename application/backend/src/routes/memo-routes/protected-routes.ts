import { MemoController } from "@controllers/memo-controller";
import { auth } from "@middlewares/auth";
import { tryCatch } from "@middlewares/try-catch";
import { Router } from "express";
import multer from 'multer';

const memo = new MemoController()
const upload = multer({ dest: '/tmp/uploads/'})
export const memoRoutes = Router()

memoRoutes.use(tryCatch(auth))

.post('/', upload.single('audio'), tryCatch(memo.createMemo))
.get('/', tryCatch(memo.getAllMemos))
.get('/:id', tryCatch(memo.getMemo))
.patch('/:id', tryCatch(memo.updateMemo))
.delete('/:id', tryCatch(memo.deleteMemo))
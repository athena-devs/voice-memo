import { MemoController } from "@controllers/memo-controller";
import { tryCatch } from "@middlewares/try-catch";
import { Router } from "express";

const memo = new MemoController()

export const memoUnprotectedRoutes = Router()
.post('/', tryCatch(memo.createMemo))

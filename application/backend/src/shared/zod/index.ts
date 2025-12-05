import { z } from "zod";
import { IUser } from "@models/user";
import { IMemo } from "@models/memo";

export class VerifyData {
    verify_user(user: IUser) {
        const schema = z.object({
            name: z.string().max(50),
            email: z.string().email().max(25),
            password: z.string().min(6)
        });

        return schema.parse(user);
    }

    verify_memo(memo: IMemo) {
        const schema = z.object({
            title: z.string().max(25),
            path: z.string().max(50),
            text: z.string().max(200),
            summary: z.string().max(200),
        });

        return schema.parse(memo);
    }

    verify_id(id: string) {
        const schema = z.object({
            id: z.string().uuid()
        });

        return schema.parse({ id });
    }
}

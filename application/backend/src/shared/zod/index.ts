import { z } from "zod";
import { IUser } from "@models/user";
import { IMemo } from "@models/memo";
import { IRequestDTO, IUserDTO } from "@models/auth";

export class VerifyData {
    verifyUser(user: IUser) {
        const schema = z.object({
            name: z.string().max(50),
            email: z.email().max(25),
            password: z.string().min(6).max(25)
        });
        
        return schema.parse(user);
    }

    verifyLogin(user: IUserDTO) {
        const schema = z.object({
            email: z.email().max(25),
            password: z.string().min(6).max(25)
        });

        return schema.parse(user)
    }

    verifyGoogleLogin(code: IRequestDTO){
        const schema = z.object({
            code: z.string().min(1)
        });

        return schema.parse(code)
    }

    verifyMemo(memo: IMemo) {
        const schema = z.object({
            title: z.string().max(25),
            path: z.string().max(50),
            text: z.string().max(200),
            summary: z.string().max(200),
            userId: z.uuid()
        });

        return schema.parse(memo);
    }

    
    verifyFile(file: Express.Multer.File) {
        const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
        
        const ALLOWED_MIMES = [
            'audio/mpeg',
            'audio/mp4',
            'audio/ogg',
            'audio/aac', 
            'audio/x-m4a',
            'audio/webm'
        ];
        
        const fileSchema = z.object({
            originalname: z.string(),
            mimetype: z.string().refine((mime) => ALLOWED_MIMES.includes(mime), {
                message: "Invalid file type. Allowed: mp3, m4a, ogg, aac",
            }),
            size: z.number().max(MAX_SIZE_BYTES, "File size must be less than 5MB"),
            path: z.string(),
        });

        return fileSchema.parse(file);
    }

    verifyId(id: string) {
        const schema = z.object({
            id: z.uuid()
        });

        return schema.parse({ id });
    }
}

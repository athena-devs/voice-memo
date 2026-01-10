import { z } from "zod";
import { IUserCreateDTO, IUser, IUserResponseDTO, IUserUpdateDTO } from "@models/user";
import { IMemo, IMemoUpdate } from "@models/memo";
import { IRequestDTO } from "@models/auth";

export class VerifyData {

    // USER
   
    verifyUserCreate(user: IUserCreateDTO) {
        const schema = z.object({
            name: z.string().max(50),
            email: z.email().max(25),
            password: z.string().min(6).max(25)
        });
        
        return schema.parse(user);
    }

    verifyUserUpdate(user: IUserUpdateDTO) {
        const schema = z.object({
            name: z.string().max(50).optional(),
            email: z.email().max(25).optional(),
            password: z.string().min(6).max(25).optional()
        });
        
        return schema.parse(user);
    }

    verifyUserRequest(user: IUser) {
        const schema = z.object({
            email: z.email().max(25),
            password: z.string().min(6).max(25)
        });
        
        return schema.parse(user);
    }

    verifyUserResponse(user: IUserResponseDTO) {
        const schema = z.object({
            id: z.uuid(),
            name: z.string().max(50),
            email: z.email().max(25),
        });
        
        return schema.parse(user);
    }

    verifyGoogleLogin(code: IRequestDTO){
        const schema = z.object({
            code: z.string().min(1)
        });

        return schema.parse(code)
    }

    verifyToken(code: IRequestDTO){
        const schema = z.object({
            code: z.jwt({alg: "HS256"})
        });

        return schema.parse(code)
    }

    // MEMO

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

    verifyMemoUpdate(memo: IMemoUpdate) {
        const schema = z.object({
            title: z.string().max(25).optional(),
            text: z.string().max(200).optional(),
            summary: z.string().max(200).optional(),
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

    // GENERIC

    verifyId(id: string) {
        const schema = z.object({
            id: z.uuid()
        });

        return schema.parse({ id });
    }

    verifyEmail(email: string) {
        const schema = z.object({
            email: z.email()
        });

        return schema.parse({ email });
    }

}

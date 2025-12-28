import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string().default(""),
    API_KEY: z.string().default(""),
    JWT_SECRET: z.string().default(""),
    JWT_EXPIRES_IN: z.coerce.number().default(604800),
    SALT_RESULT: z.coerce.number().default(10),
    MINIO_HOST: z.string().default(""),
    MINIO_PORT: z.coerce.number().default(9000),
    MINIO_ACCESS_KEY: z.string().default(""),
    MINIO_SECRET_KEY: z.string().default(""),
    GOOGLE_CLIENT_ID: z.string().default(""),
    GOOGLE_CLIENT_SECRET: z.string().default(""),
    GOOGLE_REDIRECT_URI: z.string().default(""),
    CORS_ORIGIN: z.string().transform((val) => val.split(","))
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    console.error("Invalid environment variable", z.treeifyError(_env.error))
  
    throw new Error("❌ Invalid environment variables")
  }
  
  export const env = _env.data
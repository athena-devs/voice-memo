import { PrismaClient } from "@prisma-generated/client";
import { LogLevel } from "@prisma-generated/internal/prismaNamespace";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "@shared/env";

const logVal: LogLevel = env.NODE_ENV === "development" ? 'query' : 'info'

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter: adapter, log: [logVal] })
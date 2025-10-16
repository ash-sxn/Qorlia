import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.string().default("4000"),
  APP_SECRET: z.string().min(10, "APP_SECRET must be at least 10 characters"),
  JWT_ACCESS_TTL: z.string().default("15m"),
  JWT_REFRESH_TTL: z.string().default("7d"),
  DATABASE_URL: z.string().optional(),
  PAYMENTS_PROVIDER: z.string().optional(),
  PAYMENTS_API_KEY: z.string().optional(),
  TERRAFORM_TEMPLATE_DIR: z.string().optional(),
  CORS_ORIGINS: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment configuration", parsed.error.flatten().fieldErrors);
  throw new Error("Environment validation failed");
}

const data = parsed.data;

export const appConfig = {
  nodeEnv: data.NODE_ENV,
  port: Number(data.PORT),
  appSecret: data.APP_SECRET,
  jwt: {
    accessTtl: data.JWT_ACCESS_TTL,
    refreshTtl: data.JWT_REFRESH_TTL,
  },
  databaseUrl: data.DATABASE_URL,
  payments: {
    provider: data.PAYMENTS_PROVIDER,
    apiKey: data.PAYMENTS_API_KEY,
  },
  terraformTemplateDir: data.TERRAFORM_TEMPLATE_DIR,
  corsOrigins: data.CORS_ORIGINS
    ? data.CORS_ORIGINS.split(",").map((origin) => origin.trim())
    : ["http://localhost:5173"],
};


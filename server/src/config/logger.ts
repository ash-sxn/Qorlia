import { appConfig } from "./env.js";
import pino from "pino";

export const logger = pino({
  level: appConfig.nodeEnv === "development" ? "debug" : "info",
  transport:
    appConfig.nodeEnv === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
          },
        }
      : undefined,
});


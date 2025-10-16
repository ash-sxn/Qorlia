import { app } from "./app.js";
import { appConfig } from "./config/env.js";
import { logger } from "./config/logger.js";

const port = appConfig.port;

const server = app.listen(port, () => {
  logger.info(`🚀 API listening on http://localhost:${port}`);
});

const shutdown = (signal: NodeJS.Signals) => {
  logger.info({ signal }, "Received shutdown signal, closing server...");
  server.close(() => {
    logger.info("HTTP server closed");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

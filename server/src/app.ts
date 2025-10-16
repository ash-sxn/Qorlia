import express from "express";
import helmet from "helmet";
import cors from "cors";
import pinoHttp from "pino-http";

import { appConfig } from "./config/env.js";
import { logger } from "./config/logger.js";
import routes from "./routes.js";
import { notFoundHandler } from "./middleware/not-found.js";
import { errorHandler } from "./middleware/error-handler.js";

const app = express();

app.use(
  pinoHttp({
    logger,
    customSuccessMessage: () => "request completed",
    genReqId: (req, res) => req.headers["x-request-id"] ?? res.locals.requestId,
  })
);

app.use(
  cors({
    origin: appConfig.corsOrigins,
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };

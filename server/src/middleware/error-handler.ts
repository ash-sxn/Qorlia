import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../config/logger.js";

interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
  const message =
    status >= 500 ? "Something went wrong. Please try again later." : err.message;

  if (status >= 500) {
    logger.error({ err }, "Unhandled error");
  } else {
    logger.warn({ err }, "Handled error");
  }

  res.status(status).json({
    success: false,
    error: message,
  });
};


import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const notFoundHandler = (req: Request, res: Response, _next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
  });
};


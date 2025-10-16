import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../../utils/async-handler.js";
import { AuthService } from "./auth.service.js";
import {
  loginSchema,
  refreshSchema,
  registerSchema,
} from "./auth.schemas.js";

const authService = new AuthService();

export const register = asyncHandler(async (req, res) => {
  const payload = registerSchema.parse(req.body);
  const result = await authService.register(payload);
  res.status(StatusCodes.CREATED).json(result);
});

export const login = asyncHandler(async (req, res) => {
  const payload = loginSchema.parse(req.body);
  const result = await authService.login(payload);
  res.status(StatusCodes.OK).json(result);
});

export const refresh = asyncHandler(async (req, res) => {
  const payload = refreshSchema.parse(req.body);
  const result = await authService.refresh(payload);
  res.status(StatusCodes.OK).json(result);
});


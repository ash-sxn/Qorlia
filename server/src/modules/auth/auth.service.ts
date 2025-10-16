import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { StatusCodes } from "http-status-codes";

import { appConfig } from "../../config/env.js";
import type { LoginInput, RefreshInput, RegisterInput } from "./auth.schemas.js";

type StoredUser = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
};

type HttpError = Error & { statusCode?: number };

const users = new Map<string, StoredUser>();

export class AuthService {
  async register(payload: RegisterInput) {
    if (users.has(payload.email)) {
      const error: HttpError = new Error("Account already exists with this email.");
      error.statusCode = StatusCodes.CONFLICT;
      throw error;
    }

    const id = randomUUID();
    const passwordHash = await bcrypt.hash(payload.password, 10);
    const stored: StoredUser = {
      id,
      email: payload.email,
      name: payload.name,
      passwordHash,
    };

    users.set(payload.email, stored);

    const tokens = this.generateTokens(stored);

    return {
      user: this.sanitize(stored),
      ...tokens,
    };
  }

  async login(payload: LoginInput) {
    const user = users.get(payload.email);
    if (!user) {
      const error: HttpError = new Error("Invalid email or password.");
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }

    const passwordValid = await bcrypt.compare(payload.password, user.passwordHash);
    if (!passwordValid) {
      const error: HttpError = new Error("Invalid email or password.");
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }

    const tokens = this.generateTokens(user);
    return {
      user: this.sanitize(user),
      ...tokens,
    };
  }

  async refresh(payload: RefreshInput) {
    try {
      const secret = appConfig.appSecret as jwt.Secret;
      const decoded = jwt.verify(payload.refreshToken, secret) as jwt.JwtPayload;
      const userId = decoded.sub as string;
      const user = [...users.values()].find((candidate) => candidate.id === userId);
      if (!user) {
        const error: HttpError = new Error("Session is no longer valid.");
        error.statusCode = StatusCodes.UNAUTHORIZED;
        throw error;
      }
      const tokens = this.generateTokens(user);
      return {
        user: this.sanitize(user),
        ...tokens,
      };
    } catch (error) {
      const err: HttpError = new Error("Invalid or expired refresh token.");
      err.statusCode = StatusCodes.UNAUTHORIZED;
      throw err;
    }
  }

  private generateTokens(user: StoredUser) {
    const payload = { sub: user.id, email: user.email };
    const secret = appConfig.appSecret as jwt.Secret;
    const accessOptions: jwt.SignOptions = {
      expiresIn: appConfig.jwt.accessTtl as jwt.SignOptions["expiresIn"],
    };
    const refreshOptions: jwt.SignOptions = {
      expiresIn: appConfig.jwt.refreshTtl as jwt.SignOptions["expiresIn"],
    };
    const accessToken = jwt.sign(payload, secret, accessOptions);
    const refreshToken = jwt.sign(payload, secret, refreshOptions);
    return { accessToken, refreshToken };
  }

  private sanitize(user: StoredUser) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}

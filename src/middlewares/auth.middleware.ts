import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { JwtPayload, verifyJwt } from "../utils/jwt";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next(new ApiError(401, "Unauthorized: Bearer token is required"));
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = verifyJwt(token);
    next();
  } catch (_error) {
    next(new ApiError(401, "Unauthorized: Invalid or expired token"));
  }
};

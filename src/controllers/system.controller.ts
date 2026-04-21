import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

export const getHealth = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

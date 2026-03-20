import { Request, Response } from "express";
import { z } from "zod";
import { loginUser, registerUser } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const data = await loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data,
  });
});

import mongoose from "mongoose";
import { Request, Response } from "express";
import { z } from "zod";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../services/category.service";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export const categorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export const getAllCategories = asyncHandler(
  async (_req: Request, res: Response) => {
    const data = await getCategories();

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data,
    });
  },
);

export const createNewCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await createCategory(req.body);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data,
    });
  },
);

export const updateExistingCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid category id");
    }

    const data = await updateCategory(id, req.body);

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data,
    });
  },
);

export const removeCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid category id");
    }

    await deleteCategory(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  },
);

import mongoose from "mongoose";
import { Request, Response } from "express";
import { z } from "zod";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/product.service";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export const productSchema = z.object({
  name: z.string().min(1),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  categoryId: z.string().min(1),
});

export const getAllProducts = asyncHandler(
  async (_req: Request, res: Response) => {
    const data = await getProducts();

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data,
    });
  },
);

export const createNewProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await createProduct(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data,
    });
  },
);

export const updateExistingProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid product id");
    }

    const data = await updateProduct(id, req.body);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data,
    });
  },
);

export const removeProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid product id");
    }

    await deleteProduct(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  },
);

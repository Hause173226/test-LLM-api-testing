import mongoose from "mongoose";
import Category from "../models/category.model";
import Product from "../models/product.model";
import { ApiError } from "../utils/ApiError";

interface ProductInput {
  name: string;
  price: number;
  stock: number;
  categoryId: string;
}

const ensureCategoryExists = async (categoryId: string): Promise<void> => {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(400, "Invalid categoryId");
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }
};

export const getProducts = async () => {
  return Product.find()
    .populate("categoryId", "name description")
    .sort({ createdAt: -1 });
};

export const createProduct = async (payload: ProductInput) => {
  await ensureCategoryExists(payload.categoryId);
  return Product.create(payload);
};

export const updateProduct = async (id: string, payload: ProductInput) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await ensureCategoryExists(payload.categoryId);

  product.name = payload.name;
  product.price = payload.price;
  product.stock = payload.stock;
  product.categoryId = new mongoose.Types.ObjectId(payload.categoryId);

  await product.save();

  return Product.findById(product._id).populate(
    "categoryId",
    "name description",
  );
};

export const deleteProduct = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }
};

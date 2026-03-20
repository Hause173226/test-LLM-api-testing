import Category from "../models/category.model";
import { ApiError } from "../utils/ApiError";

interface CategoryInput {
  name: string;
  description?: string;
}

export const getCategories = async () => {
  return Category.find().sort({ createdAt: -1 });
};

export const createCategory = async (payload: CategoryInput) => {
  const existing = await Category.findOne({ name: payload.name });
  if (existing) {
    throw new ApiError(409, "Category name already exists");
  }

  return Category.create(payload);
};

export const updateCategory = async (id: string, payload: CategoryInput) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  if (payload.name && payload.name !== category.name) {
    const duplicate = await Category.findOne({ name: payload.name });
    if (duplicate) {
      throw new ApiError(409, "Category name already exists");
    }
  }

  category.name = payload.name;
  category.description = payload.description;

  await category.save();
  return category;
};

export const deleteCategory = async (id: string) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }
};

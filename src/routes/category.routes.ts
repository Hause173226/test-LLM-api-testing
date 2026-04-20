import { Router } from "express";
import {
  categorySchema,
  createNewCategory,
  getAllCategories,
  removeCategory,
  updateExistingCategory,
} from "../controllers/category.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validate.middleware";

const router = Router();

router.get("/", getAllCategories);
router.post(
  "/",
  authMiddleware,
  validateBody(categorySchema),
  createNewCategory,
);
router.put(
  "/:id",
  authMiddleware,
  validateBody(categorySchema),
  updateExistingCategory,
);
router.delete("/:id", authMiddleware, removeCategory);

export default router;

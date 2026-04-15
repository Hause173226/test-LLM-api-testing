import { Router } from "express";
import {
  categorySchema,
  createNewCategory,
  getAllCategories,
  removeCategory,
  updateExistingCategory,
} from "../controllers/category.controller";
import { validateBody } from "../middlewares/validate.middleware";

const router = Router();

router.get("/", getAllCategories);
router.post("/", validateBody(categorySchema), createNewCategory);
router.put("/:id", validateBody(categorySchema), updateExistingCategory);
router.delete("/:id", removeCategory);

export default router;

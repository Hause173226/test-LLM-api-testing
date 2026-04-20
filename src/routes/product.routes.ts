import { Router } from "express";
import {
  createNewProduct,
  getAllProducts,
  productSchema,
  removeProduct,
  updateExistingProduct,
} from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validate.middleware";

const router = Router();

router.get("/", getAllProducts);
router.post("/", authMiddleware, validateBody(productSchema), createNewProduct);
router.put(
  "/:id",
  authMiddleware,
  validateBody(productSchema),
  updateExistingProduct,
);
router.delete("/:id", authMiddleware, removeProduct);

export default router;

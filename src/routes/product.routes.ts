import { Router } from "express";
import {
  createNewProduct,
  getAllProducts,
  productSchema,
  removeProduct,
  updateExistingProduct,
} from "../controllers/product.controller";
import { validateBody } from "../middlewares/validate.middleware";

const router = Router();

router.get("/", getAllProducts);
router.post("/", validateBody(productSchema), createNewProduct);
router.put("/:id", validateBody(productSchema), updateExistingProduct);
router.delete("/:id", removeProduct);

export default router;

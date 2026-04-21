import { Router } from "express";
import { getHealth } from "../controllers/system.controller";
import authRoutes from "./auth.routes";
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";

const router = Router();

router.get("/health", getHealth);

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

export default router;

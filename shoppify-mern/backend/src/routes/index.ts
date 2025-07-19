import { Router } from "express";
import AuthRoutes from "./authRoutes";
import ProductRoutes from "./productRoutes";
import CartRoutes from "./cartRoutes";
import wishListRoutes from "./wishlistRoutes";
import orderRoutes from "./orderRoutes";

const router = Router();

router.use("/v1/auth", AuthRoutes);
router.use("/v1/products", ProductRoutes);
router.use("/v1/cart", CartRoutes);
router.use("/v1/wishlist", wishListRoutes);
router.use("/v1/order", orderRoutes);

export default router;

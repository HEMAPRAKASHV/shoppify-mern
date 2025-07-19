import { Router } from "express";
import { get_All_Products } from "../controllers/prodController";
import verifyToken from "../middleware/authMiddleware";

const ProductRoutes = Router();

ProductRoutes.get("/allProducts", verifyToken, get_All_Products);

export default ProductRoutes;

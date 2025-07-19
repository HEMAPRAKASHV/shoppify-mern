import express from "express";
import { order_Product, get_all_orders } from "../controllers/orderController";
import verifyToken from "../middleware/authMiddleware";

const orderRoutes = express.Router();

// Route to order the product
orderRoutes.post("/order-product", verifyToken, order_Product);
orderRoutes.get("/getOrders", verifyToken, get_all_orders);

export default orderRoutes;

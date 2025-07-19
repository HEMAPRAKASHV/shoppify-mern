import express from "express";
import {
  remove_From_Cart,
  update_Cart,
  remove_single_Prod,
  get_Cart_Items,
} from "../controllers/cartController";
import verifyToken from "../middleware/authMiddleware";

const CartRoutes = express.Router();

// Route to update the cart
CartRoutes.put("/update-cart", verifyToken, update_Cart);
CartRoutes.put("/remove-cart", verifyToken, remove_From_Cart);
CartRoutes.put("/remove-single-Prod", verifyToken, remove_single_Prod);
CartRoutes.get("/getCart", verifyToken, get_Cart_Items);

export default CartRoutes;

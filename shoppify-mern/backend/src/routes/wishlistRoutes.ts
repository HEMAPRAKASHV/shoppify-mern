import express from "express";
import {
  update_Wishlist,
  get_Wish_Lists,
} from "../controllers/wishlistController";
import verifyToken from "../middleware/authMiddleware";

const wishListRoutes = express.Router();

// Route to update the wishlist
wishListRoutes.put("/add-to-wishlist", verifyToken, update_Wishlist);
wishListRoutes.get("/getWishList", verifyToken, get_Wish_Lists);

export default wishListRoutes;

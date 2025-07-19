import Order from "../models/orderModel";
import { User } from "../models/userModel";
import Product from "../models/productModel";
import { CUSTOM_CODES } from "../constants/app.constants";
import AppError from "../utils/AppError";

/**
 * Function to create a new order.
 * This function calculates the total amount for the order, creates the order, saves it to the database, and clears the user's cart.
 * @author [Hemaprakash V]
 * @param userId - The ID of the user creating the order.
 * @param products - An array of products with their quantities.
 * @returns The created order.
 */
export const createOrder = async (
  userId: string,
  products: { product: string; quantity: number }[]
) => {
  // Initialize total amount and product names array
  let totalAmount = 0;
  let productNames: String[] = [];

  // Loop through each product to calculate the total amount and get product names
  for (const item of products) {
    const product = await Product.findById(item.product);
    if (product) {
      productNames.push(product?.name);
      totalAmount += product.price * item.quantity;
    }
  }

  // Create a new order object
  const order = new Order({
    user: userId,
    products: products.map((item, index) => ({
      name: productNames[index],
      product: item.product,
      quantity: item.quantity,
    })),
    totalAmount,
    status: "Pending",
  });

  // Save the order to the database
  await order.save();

  // Clear the user's cart after order creation
  await User.findByIdAndUpdate(userId, { cart: [] });

  return order;
};

/**
 * Function to get all orders for a specific user.
 * This function retrieves all orders for the given user ID.
 * @author [Hemaprakash V]
 * @param userId - The ID of the user whose orders are being retrieved.
 * @returns An array of orders for the user.
 */
export const getOrders = async (
  userId: string,
  query: string,
  page: number,
  limit: number
) => {
  try {
    const searchQuery = query ? { name: { $regex: query, $options: "i" } } : {};
    const skip = (page - 1) * limit;
    const [orders, totalCount] = await Promise.all([
      Order.find({ user: userId, ...searchQuery })
        .populate("products.product", "name price imageUrl")
        .skip(skip)
        .limit(limit),
      Order.countDocuments({ user: userId, ...searchQuery }),
    ]);
    return { orders, totalCount };
  } catch (error) {
    console.error("Failed to fetch orders", error);
    throw new AppError(
      500,
      CUSTOM_CODES.FETCH_PRODUCTS_FAILED.code,
      CUSTOM_CODES.FETCH_PRODUCTS_FAILED.message
    );
  }
};

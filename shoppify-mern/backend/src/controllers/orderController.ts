import { NextFunction, Request, Response } from "express";
import { createOrder, getOrders } from "../service/orderService";
import { sendResponse } from "../utils/handleResponse";
import { CUSTOM_CODES } from "../constants/app.constants";
import logger from "../utils/logger";
import { sendEmail } from "../service/emailService";

/**
 * Controller to create a new order.
 * This method handles the HTTP POST request to create a new order.
 * It uses the createOrder service to create the order and sends a JSON response with the order details.
 * If an error occurs, it sends a 500 status code with an error message.
 * @author [Hemaprakash V]
 * @param req - Express request object
 * @param res - Express response object
 */
export const order_Product = async (req: Request, res: Response) => {
  try {
    const { userId, products } = req.body;
    // Create order
    const order = await createOrder(userId, products);
    await sendEmail({
      to: "hemaprakshv@gmail.com",
      subject: "You got an order",
      text: "",
      html: `<div> 
             <h1>User name: Order Details</h1> 
             <div>`
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
};

/**
 * Controller to get all orders for a user.
 * This method handles the HTTP GET request to fetch all orders for a specific user.
 * It uses the getOrders service to retrieve the orders and sends a JSON response with the list of orders.
 * If an error occurs, it sends a 500 status code with an error message.
 * @author [Hemaprakash V]
 * @param req - Express request object
 * @param res - Express response object
 */
export const get_all_orders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId: string = req.auth.userId;
    const query: string = (req.query.search as string) || "";
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 10;
    const { orders, totalCount } = await getOrders(userId, query, page, limit);
    logger.info(CUSTOM_CODES.FETCH_ORDERS_SUCCESS.code);
    return sendResponse(
      res,
      200,
      CUSTOM_CODES.FETCH_ORDERS_SUCCESS.message,
      CUSTOM_CODES.FETCH_ORDERS_SUCCESS.code,
      null,
      {
        orders,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
      }
    );
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

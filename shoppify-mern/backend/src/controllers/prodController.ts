import { NextFunction, Request, Response } from "express";
import { allProducts } from "../service/prodService";
import logger from "../utils/logger";
import { CUSTOM_CODES } from "../constants/app.constants";
import { sendResponse } from "../utils/handleResponse";

/**
 * Controller to get all products.
 * This method handles the HTTP GET request to fetch all products from the database based on the provided search query, pagination, and limit.
 * It uses the allProducts service to retrieve the data and sends a JSON response with the list of products, current page, total pages, and total count.
 * If an error occurs, it logs the error and passes it to the next middleware.
 *
 * @param {Request} req - Express request object containing query parameters for search, page, and limit.
 * @param {Response} res - Express response object used to send the JSON response.
 * @param {NextFunction} next - Express next function to pass control to the next middleware.
 * @returns {Promise<void>} Sends a JSON response with the products data or passes the error to the next middleware.
 *
 * @example
 * // Example request: GET /api/products?search=laptop&page=1&limit=10
 * // Example response: { products: [...], currentPage: 1, totalPages: 5, totalCount: 50 }
 *
 * @function
 * @async
 * @memberof module:ProductController
 */

export const get_All_Products = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const searchQuery: string = (req.query.search as string) || "";
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 10;
    const { products, totalCount } = await allProducts(
      searchQuery,
      page,
      limit
    );
    logger.info(CUSTOM_CODES.FETCH_PRODUCTS_SUCCESS.code);
    sendResponse(
      res,
      200,
      CUSTOM_CODES.FETCH_PRODUCTS_SUCCESS.message,
      CUSTOM_CODES.FETCH_PRODUCTS_SUCCESS.code,
      null,
      {
        products,
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

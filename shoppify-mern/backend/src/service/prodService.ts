import { CUSTOM_CODES } from "../constants/app.constants";
import Product from "../models/productModel";
import AppError from "../utils/AppError";

/**
 * Function to retrieve all products.
 * This function fetches all products from the database based on the provided search query, pagination, and limit.
 * It returns the products along with the total count of matching products.
 * If an error occurs, it logs the error and throws a new AppError.
 *
 * @param {string} searchQuery - The search query to filter products by name (case-insensitive).
 * @param {number} page - The page number for pagination.
 * @param {number} limit - The number of products to return per page.
 * @returns {Promise<{ products: Array, totalCount: number }>} An object containing an array of products and the total count of matching products.
 * @throws {AppError} Throws an error if fetching products fails.
 *
 * @example
 * const { products, totalCount } = await allProducts('laptop', 1, 10);
 * console.log(products, totalCount);
 *
 * @function
 * @async
 * @memberof module:ProductController
 */
export const allProducts = async (
  searchQuery: string,
  page: number,
  limit: number
) => {
  try {
    // Use a case-insensitive regex to match the search query
    const query = searchQuery
      ? { name: { $regex: searchQuery, $options: "i" } }
      : {};
    const skip = (page - 1) * limit;
    const [products, totalCount] = await Promise.all([
      Product.find(query).skip(skip).limit(limit),
      Product.countDocuments(query),
    ]);
    return { products, totalCount };
  } catch (error) {
    console.error("Failed to fetch products", error);
    throw new AppError(
      500,
      CUSTOM_CODES.FETCH_PRODUCTS_FAILED.code,
      CUSTOM_CODES.FETCH_PRODUCTS_FAILED.message
    );
  }
};

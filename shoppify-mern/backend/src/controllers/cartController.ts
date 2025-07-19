import { NextFunction, Request, Response } from 'express';
import { addToCart, getCartItems, removeFromCart, removesingleProd } from '../service/cartService';
import logger from '../utils/logger';
import { CUSTOM_CODES } from '../constants/app.constants';
import { sendResponse } from '../utils/handleResponse';

/**
 * Controller to update the cart.
 * This method handles the HTTP POST request to add or update items in the cart.
 * It uses the addToCart service to update the cart and sends a JSON response with the updated cart details.
 * If an error occurs, it sends a 500 status code with an error message.
 * @author Hemaprakash V
 * @param req - Express request object
 * @param res - Express response object
 */
export const update_Cart = async (req: Request, res: Response, next : NextFunction): Promise<any> => {
    try {
        const { userId, productId, quantity } = req.body;
        const cart = await addToCart(userId, productId, quantity);
        logger.info(CUSTOM_CODES.UPDATE_CART_SUCCESS.code)
        return sendResponse(res, 200, CUSTOM_CODES.UPDATE_CART_SUCCESS.message, CUSTOM_CODES.UPDATE_CART_SUCCESS.code, null, cart)
    } catch (error) {
        logger.error(error);
		next(error)    
    }
};

/**
 * Controller to remove a single product from the cart.
 * This method handles the HTTP DELETE request to remove a single product from the cart.
 * It uses the removesingleProd service to update the cart and sends a JSON response with the updated cart details.
 * If an error occurs, it sends a 500 status code with an error message.
 * @author [Hemaprakash V]
 * @param req - Express request object
 * @param res - Express response object
 */
export const remove_single_Prod = async (req: Request, res: Response, next : NextFunction): Promise<any> => {
    try {
        const { userId, productId, quantity } = req.body;
        const cart = await removesingleProd(userId, productId, quantity);
        logger.info(CUSTOM_CODES.UPDATE_CART_SUCCESS.code);
        return sendResponse(res, 200, CUSTOM_CODES.UPDATE_CART_SUCCESS.message, CUSTOM_CODES.UPDATE_CART_SUCCESS.code, null, cart)
    } catch (error) {
        logger.error(error);
		next(error)       
    }
};

/**
 * Controller to remove a product from the cart.
 * This method handles the HTTP DELETE request to remove a product from the cart.
 * It uses the removeFromCart service to update the cart and sends a JSON response with the updated cart details.
 * If an error occurs, it sends a 500 status code with an error message.
 * @author [Hemaprakash V]
 * @param req - Express request object
 * @param res - Express response object
 */
export const remove_From_Cart = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { userId, productId } = req.body;
        const cart = await removeFromCart(userId, productId);
        logger.info(CUSTOM_CODES.UPDATE_CART_SUCCESS.code);
        return sendResponse(res, 200, CUSTOM_CODES.UPDATE_CART_SUCCESS.message, CUSTOM_CODES.UPDATE_CART_SUCCESS.code, null, cart)
    } catch (error) {
        logger.error(error);
		next(error)      
    }
};

/**
 * Controller to get all items in the cart.
 * This method handles the HTTP GET request to fetch all items in the cart.
 * It uses the getCartItems service to retrieve the cart data and sends a JSON response with the list of cart items.
 * If an error occurs, it sends a 500 status code with an error message.
 * @author [Hemaprakash V]
 * @param req - Express request object
 * @param res - Express response object
 */
export const get_Cart_Items = async (req: Request, res: Response, next:NextFunction):Promise<any> => {
    try {
        const { userId } = req.query;
        const cart = await getCartItems(userId);
        logger.info(CUSTOM_CODES.FETCH_CART_SUCCESS.code);
        return sendResponse(res, 200, CUSTOM_CODES.FETCH_CART_SUCCESS.message, CUSTOM_CODES.FETCH_CART_SUCCESS.code, null, cart)
    } catch (error) {
        logger.error(error);
		next(error)
    }
};
import { NextFunction, Request, Response } from 'express';
import { addToWishlist, getWishListItems } from '../service/wishlistService';
import logger from '../utils/logger';
import { CUSTOM_CODES } from '../constants/app.constants';
import { sendResponse } from '../utils/handleResponse';

/**
 * Controller to update the wishlist.
 * This method handles the HTTP POST request to add items to the wishlist.
 * It uses the addToWishlist service to update the wishlist and sends a JSON response with the updated wishlist details.
 * If an error occurs, it sends a 500 status code with an error message.
 * @author [Hemaprakash V]
 * @param req - Express request object
 * @param res - Express response object
 */
export const update_Wishlist = async (req: Request, res: Response, next:NextFunction):Promise<any> => {
    try {
        const { userId, productId } = req.body;
        const cart = await addToWishlist(userId, productId);
        logger.info(CUSTOM_CODES.UPDATE_WISHLIST_SUCCESS.code)
        return sendResponse(res, 200, CUSTOM_CODES.UPDATE_WISHLIST_SUCCESS.message, CUSTOM_CODES.UPDATE_WISHLIST_SUCCESS.code, null, cart)
    } catch (error) {
        logger.error(error);
		next(error)     
    }
};

/**
 * Controller to get all wishlist items.
 * This method handles the HTTP GET request to fetch all items in the wishlist.
 * It uses the getWishListItems service to retrieve the data and sends a JSON response with the list of wishlist items.
 * If an error occurs, it sends a 500 status code with an error message.
 * @author [Hemaprakash V]
 * @param req - Express request object
 * @param res - Express response object
 */
export const get_Wish_Lists = async (req: Request, res: Response, next:NextFunction):Promise<any> => {
    try {
        const { userId } = req.query;
        const cart = await getWishListItems(userId);
        logger.info(CUSTOM_CODES.FETCH_WISHLIST_SUCCESS.code);
        return sendResponse(res, 200, CUSTOM_CODES.FETCH_WISHLIST_SUCCESS.message, CUSTOM_CODES.FETCH_WISHLIST_SUCCESS.code, null, cart)
    } catch (error) {
        logger.error(error);
		next(error)    
    }
};
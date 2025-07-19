import { CUSTOM_CODES } from '../constants/app.constants';
import { User } from '../models/userModel';
import AppError from '../utils/AppError';

/**
 * Function to add or remove a product from the user's wishlist.
 * This function checks if the product is already in the user's wishlist.
 * If it is, the product is removed from the wishlist.
 * If it is not, the product is added to the wishlist.
 * @author [Hemaprakash V]
 * @param userId - The ID of the user.
 * @param productId - The ID of the product to be added or removed.
 * @returns An object containing a message and the updated wishlist.
 */
export const addToWishlist = async (userId: string, productId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(400, CUSTOM_CODES.UPDATE_WISHLIST_FAILED.code, CUSTOM_CODES.UPDATE_WISHLIST_FAILED.message);
    }
    let message: string = ''
    const wishlistIndex = user.wishlist.findIndex(item => item.toString() === productId);
    if (wishlistIndex > -1) {
        user.wishlist.splice(wishlistIndex, 1);
        message = "Product removed from Wishlist successfully"
    } else {
        user.wishlist.push(productId);
        message = "Product added to Wishlist successfully"
    }

    await user.save();
    return { message: message, data: user.wishlist };
}

/**
 * Function to get all items in the user's wishlist.
 * This function retrieves the wishlist of the user with the given user ID.
 * @author [Hemaprakash V]
 * @param userId - The ID of the user.
 * @returns The wishlist of the user.
 */
export const getWishListItems = async (userId: any) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(400, CUSTOM_CODES.FETCH_WISHLIST_FAILED.code, CUSTOM_CODES.FETCH_WISHLIST_FAILED.message);
    }
    return user.wishlist
}
import { CUSTOM_CODES } from '../constants/app.constants';
import { User } from '../models/userModel';
import AppError from '../utils/AppError';

/**
 * Service to add a product to the cart.
 * This method handles the logic to add or update a product in the user's cart.
 * It checks if the user exists, updates the quantity if the product is already in the cart, or adds the product if it's not.
 * If successful, it returns the updated cart.
 * If an error occurs, it throws an error with a message.
 * @author [Hemaprakash V]
 * @param userId - User's ID
 * @param productId - Product's ID
 * @param quantity - Quantity of the product to add (default is 1)
 * @returns The updated cart
 */
export const addToCart = async (userId: string, productId: string, quantity: number = 1) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(400, CUSTOM_CODES.UPDATE_CART_FAILED.code, CUSTOM_CODES.UPDATE_CART_FAILED.message);
    }
    const cartItem = user.cart.find(item => item.product.toString() === productId);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        user.cart.push({ product: productId, quantity });
    }

    await user.save();
    return user.cart;
};

/**
 * Service to remove a single product from the cart.
 * This method handles the logic to decrease the quantity of a product in the user's cart.
 * If the quantity becomes zero or less, it removes the product from the cart.
 * If successful, it returns the updated cart.
 * If an error occurs, it throws an error with a message.
 * @author [Hemaprakash V]
 * @param userId - User's ID
 * @param productId - Product's ID
 * @param quantity - Quantity of the product to remove (default is 1)
 * @returns The updated cart
 */
export const removesingleProd = async (userId: string, productId: string, quantity: number = 1) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(400, CUSTOM_CODES.UPDATE_CART_FAILED.code, CUSTOM_CODES.UPDATE_CART_FAILED.message);
    }
    const cartItem = user.cart.find(item => item.product.toString() === productId);
    if (cartItem) {
        cartItem.quantity -= quantity;
        if (cartItem.quantity <= 0) {
            user.cart = user.cart.filter(item => item.product.toString() !== productId);
        }
    } else {
        user.cart.push({ product: productId, quantity });
    }

    await user.save();
    return user.cart;
};

/**
 * Service to remove a product from the cart.
 * This method handles the logic to remove a product from the user's cart.
 * It checks if the user exists and if the product is in the cart, then removes it.
 * If successful, it returns the updated cart.
 * If an error occurs, it throws an error with a message.
 * @author [Hemaprakash V]
 * @param userId - User's ID
 * @param productId - Product's ID
 * @returns The updated cart
 */
export const removeFromCart = async (userId: string, productId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(400, CUSTOM_CODES.UPDATE_CART_FAILED.code, CUSTOM_CODES.UPDATE_CART_FAILED.message);
    }
    const cartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);
    if (cartItemIndex > -1) {
        user.cart.splice(cartItemIndex, 1);
    } else {
        throw new AppError(400, CUSTOM_CODES.UPDATE_CART_FAILED.code, CUSTOM_CODES.UPDATE_CART_FAILED.message);
    }

    await user.save();
    return user.cart;
};

/**
 * Service to get all items in the cart.
 * This method handles the logic to fetch all items in the user's cart.
 * It checks if the user exists and returns the cart items.
 * If an error occurs, it throws an error with a message.
 * @author [Hemaprakash V]
 * @param userId - User's ID
 * @returns The user's cart items
 */
export const getCartItems = async (userId: any) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(400, CUSTOM_CODES.FETCH_CART_FAILED.code, CUSTOM_CODES.FETCH_CART_FAILED.message);
    }
    return user.cart;
};
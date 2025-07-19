import bcrypt from "bcryptjs";
import { User } from "../models/userModel";
import { LoginUserParams, RegisterUserParams } from "../interfaces/interface";
import AppError from "../utils/AppError";
import { CUSTOM_CODES, ERROR_CODES } from "../constants/app.constants";
import { generateRefreshToken, generateToken } from "../utils/generateToken";

/**
 * Service to register a new user.
 * This method handles the logic to register a new user.
 * It checks if the user already exists, hashes the password, and saves the user to the database.
 * If successful, it returns a success message and the user's first name.
 * If an error occurs, it throws an error with a message.
 * @author Hemaprakash V
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @param gender - User's gender
 * @param email - User's email address
 * @param phone - User's phone number
 * @param password - User's password
 * @returns An object containing a success message and the user's first name
 */
export const userRegister = async (data: RegisterUserParams) => {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
        throw new AppError(404, CUSTOM_CODES.EXISTING_USER.code, CUSTOM_CODES.EXISTING_USER.message);
    }

    const hashedpassword = await bcrypt.hash(data.password, 10);
    const user = new User({
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        password: hashedpassword,
        wishList: [],
        cart: []
    });

    await user.save();
    if (!user) {
        return ERROR_CODES.DATABASE_ERROR.code
    }
    return user;
}

/**
 * Service to log in a user.
 * This method handles the logic to authenticate a user.
 * It checks if the user exists, compares the password, and generates a JWT token.
 * If successful, it returns a success message, user details, and the token.
 * If an error occurs, it throws an error with a message.
 * @author Hemaprakash V
 * @param email - User's email address
 * @param password - User's password
 * @returns An object containing user details, and the token
 */
export const userLogin = async (data: LoginUserParams) => {
    const user = await User.findOne({ email: data.email });
    if (!user) {
        throw new AppError(400, CUSTOM_CODES.INVALID_CREDENTIALS.code, CUSTOM_CODES.INVALID_CREDENTIALS.message);
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
        throw new AppError(400, CUSTOM_CODES.INVALID_CREDENTIALS.code, CUSTOM_CODES.INVALID_CREDENTIALS.message);
    }

    const token = generateToken(user._id as unknown as string, user.role as unknown as string);
    const refreshToken = await generateRefreshToken(user)

    return {
        data: user,
        token: token,
        refreshToken: refreshToken,
    };

}

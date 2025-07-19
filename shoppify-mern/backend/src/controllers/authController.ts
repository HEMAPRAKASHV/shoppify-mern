import { NextFunction, Request, Response } from "express";
import { userRegister, userLogin } from "../service/authService";
import logger from "../utils/logger";
import { CUSTOM_CODES } from "../constants/app.constants";
import { sendResponse } from "../utils/handleResponse";
import RefreshToken from "../models/refreshTokenModel";
import { IUser } from "../interfaces/interface";
import { generateToken } from "../utils/generateToken";

/**
 * Controller to log in a user.
 * This method handles the HTTP POST request to log in a user.
 * It uses the userLogin service to authenticate the user and sends a JSON response with the user details.
 * @author Hemaprakash V
 * @param req - Express request object
 * @param res - Express response object
 */
export const Login_User = async (req: Request, res: Response, next : NextFunction): Promise<any> => {
	try {
		const data = req.body;
		const response = await userLogin(data);
		logger.info(CUSTOM_CODES.LOGIN_SUCCESS.code)
		return sendResponse(res, 201, CUSTOM_CODES.LOGIN_SUCCESS.message, CUSTOM_CODES.LOGIN_SUCCESS.code, null, response)
	} catch (error) {
		logger.error(error);
		next(error)
	}
}

export const Refresh_Access_Token = async (req: Request, res: Response):Promise<any> => {
	const { refreshToken } = req.body;

	if(!refreshToken){
		return res.status(401).json({ message: 'Refresh token is required'})
	}

	try {
		const refreshTokenDoc = await RefreshToken.findOne({ token: refreshToken});

		if( !refreshTokenDoc || refreshTokenDoc.expiresAt < new Date()){
			await RefreshToken.deleteOne({ token: refreshToken});
			return res.status(401).json({ message: 'Invalid or expired refresh token'})
		}

		const user = refreshTokenDoc.user as unknown as IUser;
		console.log(user.role)
		const newAccessToken = generateToken(user._id, user?.role as unknown as string);
		res.json({ accessToken: newAccessToken})
	}
	catch(error){
		res.status(500).json({ message: "Something went wrong while refreshing the token"})
	}
}

/**
 * Controller to register a new user.
 * This method handles the HTTP POST request to register a new user.
 * It uses the userRegister service to create the user and sends a JSON response with the user details.
 * @author Hemaprakash V
 * @param req - Express request object
 * @param res - Express response object
 */
export const Register_User = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const data = req.body;
		const response = await userRegister(data);
		logger.info(CUSTOM_CODES.REGISTER_SUCCESS.code);
		if (response) {
			return sendResponse(res, 201, CUSTOM_CODES.REGISTER_SUCCESS.message, CUSTOM_CODES.REGISTER_SUCCESS.code, null)
		}	
	} catch (error) {
		logger.error(error);
		next(error)
	}
}


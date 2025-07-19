import { Response } from "express";
import { IResponse } from "../interfaces/interface";

/**
 * @param res - Express response
 * @param httpCode - standard http code
 * @param statusCode - custom status code to be sent
 * @param message - message corresponding to the status od the service
 * @param error - custom error code when any operational error occurs, else eis to be set null
 * @param data - data obtained from service layer to be sent in response
 * @returns a formatted response sent on every request to maintain consistency
 */

export const sendResponse = <T>(res: Response, httpCode: number, message: string,  statusCode: string, error?: unknown | null, data?: T): Response<IResponse<T>> => {
    return res.status(httpCode).json({ data, statusCode, message, error })
} 
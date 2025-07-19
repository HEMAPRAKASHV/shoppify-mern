import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/handleResponse";
import { ERROR_CODES } from "../constants/app.constants";
import logger from "../utils/logger";

interface JwtPayload {
  id: string;
  role: string;
}

/**
 * Middleware to verify JWT token
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Next function to call the next middleware
 */

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    sendResponse(
      res,
      401,
      ERROR_CODES.UNAUTHORIZED.code,
      ERROR_CODES.UNAUTHORIZED.message
    );
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.auth = { userId: decoded.id, role: decoded.role };
    next();
  } catch (error: unknown) {
    if (error instanceof jwt.JsonWebTokenError) {
      sendResponse(
        res,
        401,
        ERROR_CODES.EXPIRED_TOKEN.code,
        ERROR_CODES.EXPIRED_TOKEN.message,
        null
      );
    } else {
      logger.error("Token verification error", error);
      sendResponse(
        res,
        500,
        ERROR_CODES.INVALID_TOKEN.code,
        ERROR_CODES.INVALID_TOKEN.message,
        null
      );
    }
  }
};

export default verifyToken;

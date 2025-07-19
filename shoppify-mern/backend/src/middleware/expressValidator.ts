import { Response, Request, NextFunction } from "express"
import { validationResult } from "express-validator"
import AppError from "../utils/AppError"
import { ERROR_CODES } from "../constants/app.constants"
import logger from "../utils/logger"

export const validate: any = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    logger.error(errors.array())
    throw new AppError(422, ERROR_CODES.FIELDS_ERROR.code, ERROR_CODES.FIELDS_ERROR.message)
}
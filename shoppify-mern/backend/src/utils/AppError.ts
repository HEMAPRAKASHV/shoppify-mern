/**
 * Custom application error class.
 * @constructor
 * @param {number} httpCode - The HTTP status code.
 * @param {string} statusCode - The status code.
 * @param {string} message - The error message.
 * @param {boolean} [isOperational=true] - Indicates if the error is operational.
 */
class AppError extends Error{
    public httpCode: number;
    public statusCode: string;
    public isOperational: boolean;

    constructor(httpCode: number, statusCode: string, message: string, isOperational = true) {
        super(message);
        this.httpCode = httpCode;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
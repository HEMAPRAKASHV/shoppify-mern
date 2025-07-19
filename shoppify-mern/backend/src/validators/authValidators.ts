import {body} from 'express-validator'

export const loginValidator = [
    body('email')
        .isEmail().withMessage('Invalid email')
        .notEmpty().withMessage('Email is required'),
    body('password')
        .notEmpty().withMessage('Password is required')
];

export const registrationValidators = [
    body('firstName')
        .notEmpty().withMessage('First Name is required'),
    body('middleName')
        .optional().isString(),
    body('lastName')
        .notEmpty().withMessage('Last Name is required'),
    body('phone')
        .matches(/^[0-9]{10}$/).withMessage('Phone number is not valid')
        .notEmpty().withMessage('Phone number is required'),
    body('email')
        .isEmail().withMessage('Invalid email')
        .notEmpty().withMessage('Email is required'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character')
        .notEmpty().withMessage('Password is required'),
    body('gender')
        .isIn(['Male', 'Female']).withMessage('Select a valid gender')
        .notEmpty().withMessage('Gender is required')
];


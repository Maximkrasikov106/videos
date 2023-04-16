import {body, validationResult} from "express-validator";


export const loginValidate = body('login', ).trim().isLength({
    min: 3,
    max: 10
}).matches(/^[a-zA-Z0-9_-]*$/).withMessage('login')
export const passwordValidate = body('password', ).trim().isLength({
    min: 6,
    max: 20
}).withMessage('description')
export const emailValidate = body('email', ).exists().isString().trim().notEmpty().isLength({
    max: 100
}).isURL().withMessage('email')
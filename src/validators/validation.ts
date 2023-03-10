import {body, validationResult} from "express-validator";


export const nameValidation = body('name', ).trim().isLength({
    min: 1,
    max: 15
}).withMessage('title')
export const descriptionValidate = body('description', ).trim().isLength({
    min: 1,
    max: 500
}).withMessage('description')
export const websiteUrlValidate = body('websiteUrl', ).exists().isString().trim().notEmpty().isLength({

    max: 100
}).isURL().withMessage('websiteUrl')
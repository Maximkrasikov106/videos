import {body, validationResult} from "express-validator";


export const nameValidation = body('name', ).trim().isLength({
    min: 1,
    max: 15
}).withMessage({message: 'title', field: 'title' })
export const descriptionValidate = body('description', ).trim().isLength({
    min: 1,
    max: 500
}).withMessage({message: 'description', field: 'description' })
export const websiteUrlValidate = body('websiteUrl', ).trim().isLength({
    min: 0,
    max: 100
}).isURL({protocols: ['https']}).withMessage({message: 'websiteUrl', field: 'websiteUrl' })
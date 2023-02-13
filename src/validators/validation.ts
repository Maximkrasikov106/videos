import {body, validationResult} from "express-validator";


export const nameValidation = body('name', ).trim().isLength({

    max: 15
}).withMessage('title')
export const descriptionValidate = body('description', ).trim().isLength({

    max: 500
}).withMessage('description')
export const websiteUrlValidate = body('websiteUrl', ).trim().isLength({

    max: 100
}).isURL({protocols: ['https']}).withMessage('websiteUrl')
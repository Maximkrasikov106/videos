import {body, validationResult} from "express-validator";

export const titlePostValidate = body('title', ).trim().isLength({
    min: 1,
    max: 30
}).withMessage('title')
export const ShortDescriptionPostValidate = body('shortDescription', ).trim().isLength({
    min: 1,
    max: 100
}).withMessage('shortDescription')
export const contentPostValidate = body('content', ).isString().trim().isLength({

    max: 1000
}).withMessage('content')

export const blogIdPostValidate = body('blogId', ).exists().isString().withMessage('blogId')
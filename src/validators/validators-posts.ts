import {body, validationResult} from "express-validator";
import {DB_Blogs} from "../DB";

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

export const blogIdPostValidate = body('blogId', ).custom((value, {req: Request}) => {
    const blogs = DB_Blogs.find(item => value === item)
    if (blogs) {
        return false;
    }else {
        return true;
    }
}).withMessage('blogId')
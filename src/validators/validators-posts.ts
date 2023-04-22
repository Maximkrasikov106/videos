import {body, param, validationResult} from "express-validator";
import {BlogsType, client, DB_Blogs} from "../DB";


export const titlePostValidate = body('title', ).trim().isLength({
    min: 1,
    max: 30
}).withMessage('title')
export const ShortDescriptionPostValidate = body('shortDescription', ).trim().isLength({
    min: 1,
    max: 100
}).withMessage('shortDescription')
export const contentPostValidate = body('content', ).isString().trim().isLength({
    min: 1,
    max: 1000
}).withMessage('content')

export const blogIdPostValidate = body('blogId', ).custom( async (value) => {
    const blogs = await client.db("soc").collection<BlogsType>("blogs").findOne({id: value})
    if (blogs == null) {
        throw new Error('blogId');
    }else {
        return true;
    }
}).withMessage('blogId')

export const blogIdParamPostValidate = param('blogId', ).custom( async (value) => {
    const blogs = await client.db("soc").collection("blogs").findOne({id: value})
    if (blogs == null) {
        throw new Error('blogId');
    }else {
        return true;
    }
}).withMessage('blogId')
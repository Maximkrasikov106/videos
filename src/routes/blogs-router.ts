import {Request, Response, Router} from "express";
import { body, validationResult } from 'express-validator';
import {BlogsType, DB, DB_Blogs, setDB_Blogs} from "../DB"

import {RequestWithBody, RequestWithBodyAndQuery} from "../types";
import {descriptionValidate, nameValidation, websiteUrlValidate} from "../validators/validation";
import {inputValidationMiddleware} from "../midlewares/input-validation-middleware";
import {authMiddleware} from "../midlewares/auth-middleware";
import {blogsRepositoriy} from "../repositories/blogs-repositoriy";
export const blogsRouter = Router({})




blogsRouter.get('/', (req: Request, res: Response)=> {
    res.status(200).send(DB_Blogs);
});


blogsRouter.get('/:id', async (req , res)=> {
    const foundBlog = await blogsRepositoriy.getBlogById(req.params.id)
    if (foundBlog ){
        res.status(200).send(foundBlog);
    }else{
        res.sendStatus(404);
    }
});

blogsRouter.post('/',  authMiddleware,nameValidation,descriptionValidate,websiteUrlValidate,inputValidationMiddleware,
    async (req: RequestWithBody<BlogsType>, res: Response, ) => {

    const newBlog = await blogsRepositoriy.createBlog(req.body.name, req.body.description, req.body.websiteUrl)

        DB_Blogs.push(newBlog)
        res.status(201).send(newBlog)

})


blogsRouter.delete('/:id', authMiddleware, async (req, res: Response)=> {
   let foundBlogs = await blogsRepositoriy.deleteBlog(req.params.id)
    if (foundBlogs){
        res.sendStatus(204)
    }else {
        res.sendStatus(404)
    }

});


blogsRouter.put('/:id',
    authMiddleware,
    nameValidation,
    descriptionValidate,
    websiteUrlValidate,
    inputValidationMiddleware,
    async (req: RequestWithBodyAndQuery<BlogsType>, res: Response)=> {
    let findBlog = await blogsRepositoriy.updateBlog(req.body.id, req.body)

    if (findBlog){
        res.sendStatus(204)
    }else {
        res.sendStatus(404)
    }

});
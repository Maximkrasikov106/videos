import {Request, Response, Router} from "express";
import { body, validationResult } from 'express-validator';
import {BlogsType, DB, DB_Blogs, setDB_Blogs} from "../DB"

import {RequestWithBody, RequestWithBodyAndQuery} from "../types";
import {descriptionValidate, nameValidation, websiteUrlValidate} from "../validators/validation";
import {inputValidationMiddleware} from "../midlewares/input-validation-middleware";
import {authMiddleware} from "../midlewares/auth-middleware";
export const blogsRouter = Router({})




blogsRouter.get('/', (req: Request, res: Response)=> {
    res.status(200).send(DB_Blogs);
});


blogsRouter.get('/:id', (req , res)=> {
    const foundBlog = DB_Blogs.find(item => item.id === req.params.id)
    if (foundBlog || foundBlog !== undefined){
        res.status(200).send(foundBlog);
    }else{
        res.status(404);
    }
});

blogsRouter.post('/',  authMiddleware,nameValidation,descriptionValidate,websiteUrlValidate,inputValidationMiddleware,
    (req: RequestWithBody<BlogsType>, res: Response, ) => {

    let newBlog:BlogsType = {
        id: Date.now().toString(),
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl
    }
        DB_Blogs.push(newBlog)
        res.status(201).send(newBlog)

})


blogsRouter.delete('/:id', authMiddleware,(req:RequestWithBodyAndQuery<BlogsType>, res: Response)=> {
    for (let i = 0; i < DB_Blogs.length; i++) {
        if (+DB_Blogs[i].id === +req.params.id){
            DB_Blogs.splice(i, 1)
            res.sendStatus(204)
        }else {
            res.sendStatus(404);
        }
    }


});


blogsRouter.put('/:id', authMiddleware,nameValidation,descriptionValidate,websiteUrlValidate,inputValidationMiddleware,(req: RequestWithBodyAndQuery<BlogsType>, res: Response)=> {
    let findBlog  = DB_Blogs.find(p => p.id === req.params.id)
    let index = DB_Blogs.findIndex(c => c.id === req.params.id)
    if (findBlog){
        findBlog = {...findBlog, ...req.body};
    } else {
        res.sendStatus(404)
        return
    }


    DB_Blogs.splice(index, 1, findBlog)
    res.sendStatus(204).send(findBlog)
});
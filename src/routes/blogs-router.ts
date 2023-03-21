import {Request, Response, Router} from "express";
import { body, validationResult } from 'express-validator';
import {BlogsType, DB, DB_Blogs, setDB_Blogs} from "../DB"

import {RequestWithBody, RequestWithBodyAndQuery, viewBlogModel, viewPostModel} from "../types";
import {descriptionValidate, nameValidation, websiteUrlValidate} from "../validators/validation";
import {inputValidationMiddleware} from "../midlewares/input-validation-middleware";
import {authMiddleware} from "../midlewares/auth-middleware";
import {idBlog, noIdBlog, noIdPost} from "../function/MappingId";
import {blogsService} from "../domain/blog-service";
import {
    blogIdParamPostValidate,
    blogIdPostValidate,
    contentPostValidate,
    ShortDescriptionPostValidate,
    titlePostValidate
} from "../validators/validators-posts";
export const blogsRouter = Router({})




blogsRouter.get('/', async (req: Request, res: Response)=> {

    let blogs : BlogsType[] | undefined = await blogsService.getBlogs()

    res.status(200).send( blogs ? noIdBlog(blogs) : undefined );
});


blogsRouter.get('/:id', async (req , res)=> {
    const foundBlog: BlogsType | null = await blogsService.getBlogById(req.params.id)
    if (foundBlog){
        res.status(200).send( idBlog(foundBlog));
    }else{
        res.sendStatus(404);
    }
});

blogsRouter.post('/',  authMiddleware,nameValidation,descriptionValidate,websiteUrlValidate,inputValidationMiddleware,
    async (req: RequestWithBody<BlogsType>, res: Response, ) => {

    const newBlog = await blogsService.createBlog(req.body.name, req.body.description, req.body.websiteUrl)

        if(newBlog){
            res.status(201).send(idBlog(newBlog))
        }else {
            res.sendStatus(404)
        }


})


blogsRouter.delete('/:id', authMiddleware, async (req, res: Response)=> {
   let foundBlogs = await blogsService.deleteBlog(req.params.id)
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
    let findBlog = await blogsService.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)

    if (findBlog){
        res.sendStatus(204)
    }else {
        res.sendStatus(404)
    }


});

blogsRouter.get('/:blogId/posts', async (req: Request,
                                         res:Response) => {
    let BlogPosts: any = await blogsService.getBlogPosts(req.params.blogId)
    if (!BlogPosts){
        res.sendStatus(404)
        return
    }
    res.status(200).send(noIdPost(BlogPosts))
    });

blogsRouter.post('/:blogId/posts',
    authMiddleware,
    titlePostValidate,
    ShortDescriptionPostValidate,
    contentPostValidate,
    blogIdParamPostValidate,
    inputValidationMiddleware,
    async (req: Request, res:Response) => {
    let newBLogPost = await blogsService.CreateBlogPosts(req.params.blogId, req.body.title, req.body.shortDescription, req.body.content)
    if (!newBLogPost){
        res.sendStatus(404)
        return
    }
    let getBlogPost : any = await blogsService.getBlogPosts(newBLogPost.blogId)
    res.status(201).send(getBlogPost ? noIdPost(getBlogPost) : null )
});
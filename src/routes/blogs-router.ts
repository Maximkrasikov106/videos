import {Request, Response, Router} from "express";
import { body, validationResult } from 'express-validator';
import {BlogsType, DB, DB_Blogs, setDB_Blogs} from "../DB"

import {RequestWithBody, RequestWithBodyAndQuery, viewBlogModel, viewPostModel} from "../types";
import {descriptionValidate, nameValidation, websiteUrlValidate} from "../validators/validation";
import {inputValidationMiddleware} from "../midlewares/input-validation-middleware";
import {authMiddleware} from "../midlewares/auth-middleware";
import {idBlog, noIdBlog, noIdPost, noIdPosts, vievQueryP} from "../function/MappingId";
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
    let limit =  typeof(req.query.pageSize) == "string" ? req.query.pageSize : 10;
    let sortBy = typeof(req.query.sortBy) == "string" ? req.query.sortBy : 'createdAt';
    let pageNum  = typeof(req.query.pageNumber) == "string" ? req.query.pageNumber : 1;
    let sortDirection = typeof(req.query.sortDirection) == "string" ? req.query.sortDirection : 'desc';



    let blogs : BlogsType[] | undefined = await blogsService.getBlogs( sortBy, limit, pageNum, sortDirection)
    // @ts-ignore
    let item  = noIdBlog(blogs)
    res.status(200).send( vievQueryP(item, sortBy, limit, pageNum, sortDirection) );
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

blogsRouter.get('/:blogId/posts', async (req: Request, res:Response) => {

    let limit =  typeof(req.query.pageSize) == "string" ? req.query.pageSize : 10;
    let sortBy = typeof(req.query.sortBy) == "string" ? req.query.sortBy : 'createdAt';
    let pageNum  = typeof(req.query.pageNumber) == "string" ? req.query.pageNumber : 1;
    let sortDirection = typeof(req.query.sortDirection) == "string" ? req.query.sortDirection : 'desc';
    let BlogPosts: any = await blogsService.getBlogPosts(req.params.blogId, sortBy, limit, pageNum, sortDirection)


    if (BlogPosts.length === 0){
        res.sendStatus(404)
        return
    }
    let items = noIdPosts(BlogPosts)
    res.status(200).send( vievQueryP(items, sortBy, limit, pageNum, sortDirection))
    });

blogsRouter.post('/:blogId/posts',
    authMiddleware,
    titlePostValidate,
    ShortDescriptionPostValidate,
    contentPostValidate,
    //blogIdParamPostValidate,
    inputValidationMiddleware,
    async (req: Request, res:Response) => {
    let newBLogPost = await blogsService.CreateBlogPosts(req.params.blogId, req.body.title, req.body.shortDescription, req.body.content)
    if (!newBLogPost){
        res.sendStatus(404)
        return
    }
    let getBlogPost : any = await blogsService.getBlogPost(newBLogPost.blogId)
    res.status(201).send(getBlogPost ? noIdPost(getBlogPost) : null )
});
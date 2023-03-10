import {Request, Response, Router} from "express";
import {BlogsType, DB_Blogs, DB_Posts, PostType, setDB_Blogs, setDB_Posts} from "../DB";
import {RequestWithBody, RequestWithBodyAndQuery} from "../types";
import {authMiddleware} from "../midlewares/auth-middleware";
import {
    blogIdPostValidate,
    contentPostValidate,
    ShortDescriptionPostValidate,
    titlePostValidate
} from "../validators/validators-posts";
import {inputValidationMiddleware} from "../midlewares/input-validation-middleware";
import {postsRepositoriy} from "../repositories/post-db-repositoryes";
import {blogsRepositoriy} from "../repositories/blogs-db-repositoriy";

 export function  foundedBlog(id: string) {
    let foundBlog : BlogsType | undefined = DB_Blogs.find(item => item.id === id)
    if (foundBlog){
        return foundBlog.name
    }
}

export const postsRouter = Router({})


postsRouter.get('/', async (req, res) => {
    let posts = await postsRepositoriy.getPosts()
    res.status(200).send(posts)
})


postsRouter.get('/:id', async (req, res) => {
    let post = await postsRepositoriy.getPostById(req.params.id)
    res.status(200).send(post);

})

postsRouter.post('/',
    authMiddleware,
    titlePostValidate,
    ShortDescriptionPostValidate,
    contentPostValidate,
    blogIdPostValidate,
    inputValidationMiddleware,
    async (req:RequestWithBody<PostType>, res: Response) => {

    const newPost = await postsRepositoriy.createPost(req.body.title,
             req.body.shortDescription,
             req.body.content,
            req.body.blogId,
             )

        if(newPost){
            res.status(201).send(newPost)
        }else {
            res.sendStatus(404)
        }

})


postsRouter.put('/:id',
    authMiddleware,
    titlePostValidate,
    ShortDescriptionPostValidate,
    contentPostValidate,
    blogIdPostValidate,
    inputValidationMiddleware,
    async (req:RequestWithBodyAndQuery<PostType>, res) => {
        let findPost = await postsRepositoriy.updatePost(req.params.id ,req.params.title, req.body.shortDescription, req.body.content, req.body.blogId)

        if (findPost){
            res.sendStatus(204)
        }else {
            res.sendStatus(404)
        }




})

postsRouter.delete('/:id', authMiddleware, async (req:RequestWithBodyAndQuery<PostType>, res: Response)=> {
    let foundPosts = await postsRepositoriy.deletePost(req.params.id)
    if (foundPosts){
        res.sendStatus(204)
    }else {
        res.sendStatus(404)
    }

});

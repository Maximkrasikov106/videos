import {Request, Response, Router} from "express";
import { DB_Blogs, DB_Posts, PostType, setDB_Blogs} from "../DB";
import {RequestWithBody, RequestWithBodyAndQuery} from "../types";
import {authMiddleware} from "../midlewares/auth-middleware";
import {
    blogIdPostValidate,
    contentPostValidate,
    ShortDescriptionPostValidate,
    titlePostValidate
} from "../validators/validators-posts";



export const postsRouter = Router({})


postsRouter.get('/', (req, res) => {
    res.status(200).send(DB_Posts);
})


postsRouter.get('/:id', (req, res) => {
    const foundPost: PostType[] = DB_Posts.filter(item => item.id === req.params.id)
    if (foundPost.length !== 0) {
        res.status(200).send(foundPost);
    } else {
        res.sendStatus(404)
    }

})

postsRouter.post('/',
    authMiddleware,
    titlePostValidate,
    ShortDescriptionPostValidate,
    contentPostValidate,
    blogIdPostValidate,
    (req:RequestWithBody<PostType>, res: Response) => {
    let newPost:PostType = {
        id: Date.now().toString(),
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
        blogName: "string"
    }
    DB_Posts.push(newPost);
    res.status(201).send(newPost)

})


postsRouter.put('/:id',
    authMiddleware,
    titlePostValidate,
    ShortDescriptionPostValidate,
    contentPostValidate,
    blogIdPostValidate, (req:RequestWithBodyAndQuery<PostType>, res) => {
    let findBlog  = DB_Posts.find(p => p.id === req.params.id)
    let index = DB_Posts.findIndex(c => c.id === req.params.id)
    if (findBlog){
        findBlog = {...findBlog, ...req.body};
    } else {
        res.sendStatus(404)
        return
    }

    // @ts-ignore
    DB_Posts.splice(index, 1, findBlog)
    res.sendStatus(204).send(findBlog)
})

postsRouter.delete('/:id', authMiddleware,(req:RequestWithBodyAndQuery<PostType>, res: Response)=> {
    let foundPosts = DB_Blogs.filter((item) => item.id !== req.params.id)
    if (foundPosts !== undefined) {
        if (foundPosts.length == DB_Blogs.length) {
            res.sendStatus(404)
            return
        }
        setDB_Blogs(foundPosts)
        res.sendStatus(204)
    }else {
        res.sendStatus(404)
    }

});
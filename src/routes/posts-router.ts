import {Request, Response, Router} from "express";
import {BlogsType, client, DB_Blogs, DB_Posts, PostType, setDB_Blogs, setDB_Posts} from "../DB";
import {RequestWithBody, RequestWithBodyAndQuery} from "../types";
import {authMiddleware} from "../midlewares/auth-middleware";
import {
    blogIdPostValidate,
    contentPostValidate,
    ShortDescriptionPostValidate,
    titlePostValidate
} from "../validators/validators-posts";
import {inputValidationMiddleware} from "../midlewares/input-validation-middleware";


import {noIdPost, noIdPosts} from "../function/MappingId";
import {postsService} from "../domain/posts-service";

 export async function foundedBlog(id: string) {

     let foundBlog: BlogsType | null  = await client.db("soc").collection<BlogsType>("blogs").findOne({id: id})
     if (foundBlog) {
         return foundBlog.name.toString()
     }
 }

export async function foundedDate(id: string) {

    let foundDate: BlogsType | null  = await client.db("soc").collection<BlogsType>("blogs").findOne({id: id})
    if (foundDate) {
        console.log(foundDate.createdAt)
        return foundDate.createdAt
    }
}




export const postsRouter = Router({})


postsRouter.get('/', async (req, res) => {
    let limit =  typeof(req.query.pageSize) == "string" ? req.query.pageSize : 10;
    let sortBy = typeof(req.query.sortBy) == "string" ? req.query.sortBy : 'createdAt';
    let pageNum  = typeof(req.query.pageNumber) == "string" ? req.query.pageNumber : 1;
    let sortDirection = typeof(req.query.sortDirection) == "string" ? req.query.sortDirection : 'desc';


    let posts: PostType[] | null = await postsService.getPosts(sortBy, limit, pageNum, sortDirection)

    res.status(200).send(posts ? noIdPosts(posts) : null)
})


postsRouter.get('/:id', async (req, res) => {
    let post : PostType | null = await postsService.getPostById(req.params.id)
    console.log(post)
    if (post == null){
        res.sendStatus(404)
        return
    }
    res.status(200).send( post ? noIdPost(post) : null);

})

postsRouter.post('/',
    authMiddleware,
    titlePostValidate,
    ShortDescriptionPostValidate,
    contentPostValidate,
    blogIdPostValidate,
    inputValidationMiddleware,
    async (req:RequestWithBody<PostType>, res: Response) => {

    const newPost = await postsService.createPost(req.body.title,
             req.body.shortDescription,
             req.body.content,
            req.body.blogId,
             )

        if(newPost){
            res.status(201).send(newPost ? noIdPost(newPost) : null)
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
        let findPost = await postsService.updatePost(req.params.id ,req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)

        if (findPost){
            res.sendStatus(204)
        }else {
            res.sendStatus(404)
        }




})

postsRouter.delete('/:id', authMiddleware, async (req:RequestWithBodyAndQuery<PostType>, res: Response)=> {
    let foundPosts = await postsService.deletePost(req.params.id)
    if (foundPosts){
        res.sendStatus(204)
    }else {
        res.sendStatus(404)
    }

});

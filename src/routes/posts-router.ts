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


import {noIdPost, noIdPosts, vievQueryP, viewComment} from "../function/MappingId";
import {postsService} from "../domain/posts-service";
import {blogsRepositoriy} from "../repositories/blogs-db-repositoriy";
import {blogsService} from "../domain/blog-service";
import {commentService} from "../domain/comment-service";
import {authMiddlewareJWT} from "../midlewares/auth-middleware-JWT";
import {validatorsComment} from "../validators/validators-comment";
import {queryPostsCommentsRepository} from "../query-repositoryi/query-postsComments-repository";
import {getPaginationValues} from "../utils/pagination/pagination";

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
    let count: number = await blogsRepositoriy.getCount(sortBy, limit, pageNum, sortDirection, 'posts')
    // @ts-ignore
    let item = noIdPosts(posts)
    res.status(200).send(vievQueryP(item, sortBy, limit, pageNum, sortDirection, count))
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

postsRouter.get('/:id/comments', async (req, res) => {
    let {pageSize, sortBy, pageNum, sortDirection} = getPaginationValues(req.query)
    let allPostComments = await queryPostsCommentsRepository.getPostComments(pageSize, sortBy, pageNum, sortDirection, req.params.id)

    if (allPostComments) {
        res.status(200).send(allPostComments)
    }else {
        res.status(404)
    }
})


postsRouter.post('/:id/comments', authMiddlewareJWT,validatorsComment,inputValidationMiddleware,
    async (req: Request, res:Response) => {
        let post : PostType | null = await postsService.getPostById(req.params.id)
        if (post) {

            // @ts-ignore
            let newComment = await commentService.addNewComment(req.params.id, req.body.content, req.user!._id)
            console.log(newComment)

            if (!newComment) return res.sendStatus(404);
            res.status(201).send(viewComment(newComment))
        }else {
            res.sendStatus(404)
        }
    });
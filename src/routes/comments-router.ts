import {Request, Response, Router} from "express";
import {commentService} from "../domain/comment-service";
import {viewComment} from "../function/MappingId";
import {authMiddlewareJWT} from "../midlewares/auth-middleware-JWT";


export const commentsRouter = Router({})

commentsRouter.get('/:id', async (req: Request, res: Response) => {

    let comments = await commentService.findComents(req.params.id)
    console.log(comments)
    if (comments){
        res.status(200).send(viewComment(comments))
    }else {
        res.sendStatus(404)
    }
})

commentsRouter.delete('/:id', authMiddlewareJWT, async (req: Request, res: Response) => {
    let findComment = await commentService.findComents(req.params.id)
    // @ts-ignore
    if (findComment.commentatorInfo.userId === req.user!._id.toString() ){
        let comments = await commentService.deleteComment(req.params.id)
        if (comments){
            res.status(204)
        }else {
            res.sendStatus(404)
        }
    }else {
        res.sendStatus(403)
    }
})
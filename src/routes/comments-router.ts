import {Request, Response, Router} from "express";
import {commentService} from "../domain/comment-service";
import {viewComment} from "../function/MappingId";
import {authMiddlewareJWT} from "../midlewares/auth-middleware-JWT";
import {inputValidationMiddleware} from "../midlewares/input-validation-middleware";
import {validatorsComment} from "../validators/validators-comment";


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
    console.log(findComment, 'lol')

    if (findComment){
        // @ts-ignore
        if (findComment.commentatorInfo.userId === req.user!._id.toString() ){

            let comments = await commentService.deleteComment(req.params.id)
            if (comments){
                res.sendStatus(204)
                return
            }else {
                res.sendStatus(404)
                return
            }
        }else {
            res.sendStatus(403)
            return
            }
    }else {
        res.sendStatus(404)
        return
    }
})

commentsRouter.put('/:id', authMiddlewareJWT, validatorsComment,inputValidationMiddleware,async (req: Request, res:Response) => {
    let findComment = await commentService.findComents(req.params.id)
    if (findComment) {
        // @ts-ignore
        if (findComment.commentatorInfo.userId === req.user!._id.toString()){
            let updateComment = await commentService.updateComment(req.params.id, req.body.content)
            if (updateComment) {
                res.sendStatus(204)
            }else {
                res.sendStatus(404)
                return
            }
        }else {
            res.sendStatus(403)
            return
        }
    }else {
        res.sendStatus(404)
        return
    }
})
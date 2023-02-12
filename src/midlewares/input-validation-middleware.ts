import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputValidationMiddleware = (req: Request, res:Response, next: NextFunction) => {
    const err =  validationResult(req)
    if(!err.isEmpty()) {
        res.status(400).send({errorsMessages: err.array()})
    }else{
        next()
    }
}

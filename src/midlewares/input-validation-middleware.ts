import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputValidationMiddleware = (req: Request, res:Response, next: NextFunction) => {
    const myValidationResult = validationResult(req.body.message)

    if(!myValidationResult.isEmpty()) {
        res.status(400).send({errorsMessages: myValidationResult })
    }else{
        next()
    }
}

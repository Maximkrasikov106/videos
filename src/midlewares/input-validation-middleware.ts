import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputValidationMiddleware = (req: Request, res:Response, next: NextFunction) => {




    let myValidationResult = validationResult(req)


    if(!myValidationResult.isEmpty()) {
        const errorsArray = myValidationResult.array().map(e => (
            {
                message: e.msg,
                field: e.param
        }));
        res.status(400).send({errorsMessages: errorsArray })
    }else{
        next()
    }
}

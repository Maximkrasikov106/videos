import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputValidationMiddleware = (req: Request, res:Response, next: NextFunction) => {




    let myValidationResult = validationResult(req)
    let arrayErors = [];
    arrayErors.push(myValidationResult["errors"][0].msg)
    if(!myValidationResult.isEmpty()) {
        res.status(400).send({errorsMessages: arrayErors })
    }else{
        next()
    }
}

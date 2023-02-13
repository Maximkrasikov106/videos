import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputValidationMiddleware = (req: Request, res:Response, next: NextFunction) => {
    const errorFormatter = ({ location, msg, param, value, nestedErrors } : any) => {
        // Build your resulting errors however you want! String, object, whatever - it works!
        return {
            message: msg,
            field: param
        };
    };



    let myValidationResult = validationResult(req).formatWith(errorFormatter)


    if(!myValidationResult.isEmpty()) {

        res.status(400).send({errorsMessages: myValidationResult.array({onlyFirstError: true}) })
    }else{
        next()
    }
}

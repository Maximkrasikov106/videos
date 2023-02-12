import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const authMiddleware = (req: Request, res:Response, next: NextFunction) => {

if (req.headers.authorization == 'Basic YWRtaW46cXdlcnR5' ){
 next()
}else {
 res.sendStatus(401)
}

}

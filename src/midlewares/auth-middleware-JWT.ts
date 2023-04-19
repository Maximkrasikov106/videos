import {NextFunction, Request, Response} from "express";
import {usersService} from "../domain/users-service";
import {jwtService} from "../domain/jwt-service";
import {usersType} from "../types";

export const authMiddlewareJWT = async (req: Request, res:Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        res.sendStatus(401)
        return
    }
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    const userId = await jwtService.getUserByIdToken(token)
    console.log(userId, "userId")
    if (userId) {

        // @ts-ignore
        req.user = await usersService.getUserIdByToken(userId)
        next()
        return
    }
    res.sendStatus(401)
}


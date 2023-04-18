import {NextFunction, Request, Response} from "express";
import {usersService} from "../domain/users-service";
import {jwtService} from "../domain/jwt-service";
import {usersType} from "../types";

export const authMiddlewareJWT = async (req: Request, res:Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        res.send(401)
        return
    }
    const token = req.headers.authorization.split(' ')[1]

    const userId = await jwtService.getUserByIdToken(token)

    if (userId) {

        // @ts-ignore
        req.user = await usersService.getUserIdByToken(userId)
        next()
        return
    }
    res.send(401)
}


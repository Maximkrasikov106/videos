import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {authMiddlewareJWT} from "../midlewares/auth-middleware-JWT";
import {jwtService} from "../domain/jwt-service";
import {vievUserModel} from "../function/MappingId";
export const authRouter = Router({})


authRouter.post('/login', async (req: Request,res: Response) => {

    const user = await usersService.checkLog(req.body.loginOrEmail, req.body.password)
    if (user){

        const token = await jwtService.createJwt(user)
        res.send(token).status(200)

    }else {
        res.sendStatus(401)
    }
})

authRouter.get('/me', authMiddlewareJWT, async (req: Request,res:Response) => {

    // @ts-ignore
    let findUser = await usersService.getUserIdByToken(req.user!._id)

    if (findUser){
        res.status(200).send(vievUserModel(findUser))
    }
    res.sendStatus(401)
})
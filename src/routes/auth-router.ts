import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {authMiddlewareJWT} from "../midlewares/auth-middleware-JWT";
import {jwtService} from "../domain/jwt-service";
import {vievUserModel} from "../function/MappingId";
import {registerService} from "../domain/register-service";
import {emailValidate, loginValidate, passwordValidate} from "../validators/validators-users";
import {inputValidationMiddleware} from "../midlewares/input-validation-middleware";
import {codeValidate, emailExictValidate, loginExictValidate} from "../validators/validation-registration";
export const authRouter = Router({})


authRouter.post('/login', async (req: Request,res: Response) => {

    const user = await usersService.checkLog(req.body.loginOrEmail, req.body.password)
    console.log(user)
    if (user){
        console.log(user, 'wtf');
        const token = await jwtService.createJwt(user)

        res.status(200).send(token)

    }else {
        res.sendStatus(401)
    }
})

authRouter.get('/me', authMiddlewareJWT, async (req: Request,res:Response) => {

    // @ts-ignore
    let findUser = await usersService.getUserIdByToken(req.user!._id)

    if (findUser){
        res.status(200).send(vievUserModel(findUser))
        return
    }
    res.sendStatus(401)
})

authRouter.post('/registration', loginValidate,emailExictValidate,loginExictValidate ,passwordValidate,emailValidate,inputValidationMiddleware, async (req:Request, res: Response) => {
    let newUser = await registerService.createUser(req.body.login, req.body.password, req.body.email)
    if (newUser) {
        res.sendStatus(204)
    }else {
        res.sendStatus(404)
    }
})


authRouter.post('/registration-confirmation', codeValidate,inputValidationMiddleware, async (req:Request, res: Response) => {
    let userConfirm = await registerService.checkEmail(req.body.code)
    if (userConfirm){
        res.sendStatus(204)
    }else {
        res.sendStatus(400)
    }
})

authRouter.post('/registration-email-resending', emailValidate,inputValidationMiddleware, async (req:Request, res: Response) => {
    let userConfirm = await registerService.emailResending(req.body.email)
    if (userConfirm){
        res.sendStatus(204)
    }else {
        res.sendStatus(400)
    }
})
import {Request, Response, Router} from "express";

import {usersService} from "../domain/users-service";
import {usersType} from "../types";
import {getPaginationValues} from "../utils/pagination/pagination";
import {queryUsersRepositoriy} from "../query-repositoryi/query-users-repositoriy";
import {emailValidate, loginValidate, passwordValidate} from "../validators/validators-users";
import {inputValidationMiddleware} from "../midlewares/input-validation-middleware";
import {authMiddleware} from "../midlewares/auth-middleware";


export const usersRouter = Router({})


usersRouter.get('/', async (req:Request, res: Response) => {
    let {pageSize, sortBy, pageNum, sortDirection, searchLoginTerm, searchEmailTerm} = getPaginationValues(req.query)

    let users : any = await queryUsersRepositoriy.getUsers(pageSize, sortBy, pageNum, sortDirection, searchLoginTerm, searchEmailTerm)
    res.send(users).status(200)
});


usersRouter.post('/', authMiddleware,loginValidate, passwordValidate, emailValidate,inputValidationMiddleware, async (req:Request, res: Response) => {
    // @ts-ignore
    let users: usersType | null  = await usersService.addUser(req.body)
    console.log(users)
    if (users){
        res.status(201).send(users)
    }else {
        res.status(400)
    }


});

usersRouter.delete('/:id',authMiddleware, async (req:Request, res: Response) => {
    let users = await usersService.deleteUser(req.params.id)
    if (users){
        res.sendStatus(204)
    }else {
        res.sendStatus(404)
    }

});
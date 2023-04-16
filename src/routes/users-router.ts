import {Request, Response, Router} from "express";

import {usersService} from "../domain/users-service";
import {usersType} from "../types";
import {getPaginationValues} from "../utils/pagination/pagination";
import {queryUsersRepositoriy} from "../query-repositoryi/query-users-repositoriy";
import {emailValidate, loginValidate, passwordValidate} from "../validators/validators-users";
import {inputValidationMiddleware} from "../midlewares/input-validation-middleware";


export const usersRouter = Router({})


usersRouter.get('/', async (req:Request, res: Response) => {
    let {pageSize, sortBy, pageNum, sortDirection, searchLoginTerm, searchEmailTerm} = getPaginationValues(req.query)

    let users : any = await queryUsersRepositoriy.getUsers(pageSize, sortBy, pageNum, sortDirection, searchLoginTerm, searchEmailTerm)
    res.send(users).status(200)
});


usersRouter.post('/', loginValidate, passwordValidate, emailValidate,inputValidationMiddleware, async (req:Request, res: Response) => {
    let users: usersType | null  = await usersService.addUser(req.body)
        res.status(201).send(users)

});

usersRouter.delete('/', async (req:Request, res: Response) => {
    let users = await usersService.deleteUser(req.body.id)
    res.status(201).send(users)
});
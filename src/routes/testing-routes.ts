import {Router} from "express";
import {app} from "../index";
import {DB, TypesVid} from "../DB"
export const testingRouter = Router({})

const videos:any = [];

testingRouter.delete('/all-data', (req, res)=> {
    DB.splice(0, videos.length)
    res.sendStatus(204)
});
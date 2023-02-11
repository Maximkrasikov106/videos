import {Router} from "express";

import {DB} from "../DB"
export const testingRouter = Router({})

const videos:any = [];

testingRouter.delete('/all-data', (req, res)=> {
    DB.splice(0, videos.length)
    res.sendStatus(204)
});
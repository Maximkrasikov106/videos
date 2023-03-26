import {Router} from "express";

import {BlogsType, client, PostType} from "../DB"
export const testingRouter = Router({})



testingRouter.delete('/all-data', (req, res)=> {
     client.db("soc").collection("blogs").deleteMany({})
     client.db("soc").collection("posts").deleteMany({})
    res.sendStatus(204)
});
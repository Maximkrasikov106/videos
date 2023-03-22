import {Router} from "express";

import {BlogsType, client, PostType} from "../DB"
export const testingRouter = Router({})



testingRouter.delete('/all-data', (req, res)=> {
     client.db("soc").collection<BlogsType>("blogs").deleteMany({})
     client.db("soc").collection<PostType>("posts").deleteMany({})
    res.sendStatus(204)
});
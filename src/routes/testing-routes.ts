import {Router} from "express";

import {BlogsType, client, DB, DB_Blogs, DB_Posts, PostType} from "../DB"
export const testingRouter = Router({})



testingRouter.delete('/all-data', (req, res)=> {
    DB.splice(0, DB.length)
     client.db("soc").collection<BlogsType>("blogs").deleteMany({})
     client.db("soc").collection<PostType>("posts").deleteMany({})
    res.sendStatus(204)
});
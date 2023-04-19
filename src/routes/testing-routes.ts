import {Router} from "express";

import {BlogsType, client, PostType} from "../DB"
export const testingRouter = Router({})



testingRouter.delete('/all-data', async (req, res)=> {
    await  client.db("soc").collection("blogs").deleteMany({})
    await client.db("soc").collection("posts").deleteMany({})
    await client.db("soc").collection("users").deleteMany({})
    await client.db("soc").collection("comments").deleteMany({})
    res.sendStatus(204)
});
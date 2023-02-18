import {Router} from "express";

import {DB, DB_Blogs, DB_Posts} from "../DB"
export const testingRouter = Router({})



testingRouter.delete('/all-data', (req, res)=> {
    DB.splice(0, DB.length)
    DB_Blogs.splice(0, DB_Blogs.length)
    DB_Posts.splice(0, DB_Posts.length)
    res.sendStatus(204)
});
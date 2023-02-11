import {Request, Response, Router} from "express";

import {DB_Blogs} from "../DB"
import {videosRouter} from "./videos-routes";
export const blogsRouter = Router({})

videosRouter.get('/', (req: Request, res: Response)=> {
    res.status(200).send(DB_Blogs);
});


videosRouter.get('/:id', (req: Request, res: Response)=> {
    const foundBlog = DB_Blogs.find(item => item.id === +req.params.id)
    if (foundBlog){
        res.status(200).send(DB_Blogs);
    }else{
        res.status(404);
    }
});

// videosRouter.post('/', (req: Request, res: Response) {
//
// });
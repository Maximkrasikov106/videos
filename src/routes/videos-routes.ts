import {Request, Response, Router} from "express";

import {DB, TypesVid} from "../DB"
import {RequestWithBody} from "../types";
import {CreateVideoModel} from "../models/CreateVideoModel";

export const videosRouter = Router({})


let createdAt = new Date()
let publicationDate = new Date()
publicationDate.setDate(publicationDate.getDate() +1);


videosRouter.get('/', (req: Request, res: Response)=> {
    res.status(200).send(DB);
});


videosRouter.post('/', (req:RequestWithBody<CreateVideoModel>, res: Response)=> {
    const errTitle = {message: "er", field: "title"}
    const errAuthor = {message: "er", field: "author"}
    const errAvailableResolutions = {message: "er", field: "availableResolutions"}
    let errorsArray: any = [];
    let errorsValue = 0;
    if (req.body.title === null){
        errorsArray.push(errTitle)
        res.status(400).json({errorsMessages: errorsArray})

        return;
    }
    let newVideo:TypesVid = {
        id : +Date.now() ,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions: req.body.availableResolutions
    }


    if (newVideo.title.length > 40 || typeof req.body.title !== 'string'){
        errorsArray.push(errTitle)
        errorsValue = errorsValue + 1
    }

    if (req.body.author.length > 20 || req.body.author.length < 1){
        errorsArray.push(errAuthor)
        errorsValue = errorsValue + 1
    }
    if (req.body.availableResolutions.length < 1){
        errorsArray.push(errAvailableResolutions)
        errorsValue = errorsValue + 1
    }
    if (errorsValue > 0){
        res.status(400).json({errorsMessages: errorsArray})
        return;
    }
    if (newVideo) {
        DB.push(newVideo)
        res.status(201).send(newVideo);
        return;
    }
})

videosRouter.get('/:id', (req, res)=> {
    const video =  DB.find(item => item.id === +req.params.id)
    if (!video){
        res.sendStatus(404)
        return
    }
    res.status(200).send(video);


});

videosRouter.put('/:id', (req:Request<{
    id: number;
},{},{
    title: string,
    author:string,
    canBeDownloaded: boolean,
    minAgeRestriction: number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string[],
    message: string,
    field: string,
}>, res: Response)=> {
    const video = DB.find((c: { id: number; }) => c.id === +req.params.id)
    if (!video){
        res.sendStatus(404)
        return;
    }
    if (video) {
        video.title = req.body.title
        video.author = req.body.author
        video.availableResolutions = req.body.availableResolutions
        video.canBeDownloaded = req.body.canBeDownloaded
        video.minAgeRestriction = req.body.minAgeRestriction
        video.publicationDate = req.body.publicationDate
        res.status(204)
    }

});

videosRouter.delete('/:id', (req: Request, res: Response)=> {
    let AllVideo : any =  DB.filter((c: { id: number; }) => c.id !== +req.params.id)
    if(AllVideo.length == DB.length){
        res.sendStatus(404)
        return
    }
    // @ts-ignore
    DB  = AllVideo
    res.sendStatus(204)


});

videosRouter.delete('/', (req, res)=> {
    DB.splice(0, DB.length)
    res.sendStatus(204)

    res.sendStatus(204)


});
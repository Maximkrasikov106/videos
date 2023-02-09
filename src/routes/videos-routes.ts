import {Request, Response, Router} from "express";

import {DB, TypesVid} from "../DB"
import {RequestWithBody} from "../types";
import {ChangeVideoModel, CreateVideoModel} from "../models/CreateVideoModel";
import bodyParser from "body-parser";
import {app} from "../index";

export const videosRouter = Router({})

const parserMiddleware = bodyParser({});
videosRouter.use(parserMiddleware);


let createdAt = new Date()
let publicationDate = new Date()
publicationDate.setDate(publicationDate.getDate() +1);

const availValidValue =  ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]

videosRouter.get('/', (req: Request, res: Response)=> {
    res.status(200).send(DB);
});
const errTitle = {message: "er", field: "title"}
const errAuthor = {message: "er", field: "author"}
const errAvailableResolutions = {message: "er", field: "availableResolutions"}
const canBeDownloaded = {message: "er", field: "canBeDownloaded"}
const minAgeRestriction = {message: "er", field: "minAgeRestriction"}
const pubDate = {message: "er", field: "publicationDate"}
let errorsArray: any = [];
let errorsValue = 0;


videosRouter.post('/', (req: RequestWithBody<CreateVideoModel>, res: Response)=> {

    let newVideo = {
        id : +Date.now() ,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions: req.body.availableResolutions
    }
    errorsArray.splice(0, errorsArray.length)

    if ( typeof req.body.title !== "string" || newVideo.title.length > 40   || !req.body.title  ){
        errorsArray.push(errTitle)
        errorsValue = errorsValue + 1
    }


    if (typeof req.body.author !== 'string' || req.body.author.length > 20 ||  !req.body.author ){
        errorsArray.push(errAuthor)
        errorsValue = errorsValue + 1
    }
    if ( req.body.availableResolutions.length < 1){
        errorsArray.push(errAvailableResolutions)
        errorsValue = errorsValue + 1
    }

    if (!(Array.isArray(req.body.availableResolutions))){
        errorsArray.push(errAvailableResolutions)
        errorsValue = errorsValue + 1
    }
    req.body.availableResolutions.map((item) => {
        if (!availValidValue.includes(item)) {
            errorsArray.push(errAvailableResolutions)
            errorsValue = errorsValue + 1
        }
    })

    if (errorsValue > 0){
        res.status(400).json({errorsMessages: errorsArray})
        errorsValue = 0
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

videosRouter.put('/:id', (req: Request
, res: Response)=> {
    let errorsUpdateArray = [];
    let newVideo: TypesVid | undefined = DB.find(p => p.id === +req.params.id)
    let index = DB.findIndex((c) => c.id === +req.params.id)

    if (newVideo) {
        const NewVideo = {...newVideo, ...req.body};


    if (typeof newVideo?.title !== "string" || newVideo.title.length > 40) {
        errorsUpdateArray.push(errTitle)
    }
    if (typeof newVideo?.author !== "string" || newVideo.title.length > 20) {
        errorsUpdateArray.push(errAuthor)
    }
    if (Array.isArray(newVideo?.availableResolutions)) {
        newVideo?.availableResolutions.map((item) => {
                if (!availValidValue.includes(item)) {
                    errorsUpdateArray.push(errAvailableResolutions)
                }
            }
        )
    } else {
        errorsUpdateArray.push(errAvailableResolutions)
    }
    if (typeof newVideo?.canBeDownloaded !== 'boolean') {
        errorsUpdateArray.push(canBeDownloaded)
    }

    if (newVideo?.minAgeRestriction !== null && typeof newVideo?.minAgeRestriction !== "number") {
        errorsUpdateArray.push(minAgeRestriction)
    } else if (typeof newVideo?.minAgeRestriction === "number") {
        if (+newVideo?.minAgeRestriction < 1 || +newVideo?.minAgeRestriction > 18) {
            errorsUpdateArray.push(minAgeRestriction)
        }
    }

if (typeof newVideo?.publicationDate === "string"){
    if (!/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(newVideo.publicationDate)){
        errorsUpdateArray.push(pubDate)
    }
}else {
    errorsUpdateArray.push(pubDate)
}

if (errorsUpdateArray.length > 0){
    res.status(400).send({errorsMessages : errorsUpdateArray})
} else {
    // @ts-ignore
    DB[index] = newVideo;
    res.send(204)
}
}else {
    res.send(404)
}
})







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




});
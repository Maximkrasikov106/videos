import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

export const app = express();
const port = 3000;

let videos:any = [];

const parserMiddleware = bodyParser({});
app.use(parserMiddleware);


app.delete('/testing/all-data', (req, res)=> {
    res.sendStatus(204)
});


app.get('/videos', (req, res)=> {
    res.status(200).send(videos);
});

let errorsMessages:any = [];

let createdAt = new Date()
let publicationDate = new Date(createdAt.setDate(createdAt.getDate() + 1));

app.post('/videos', (req:Request<{},{},{
    title: string,
    author:string,
    canBeDownloaded: boolean,
    minAgeRestriction: number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string,
    message: string,
    field: string
}>, res: Response)=> {
    const newVideo = {
         id : +Date.now() ,
         title: req.body.title,
         author: req.body.author,
         canBeDownloaded: false,
         minAgeRestriction: null,
         createdAt: createdAt.toISOString(),
         publicationDate: publicationDate.toISOString(),
         availableResolutions: req.body.availableResolutions
    }
    const errorMessage = {
        message: req.body.message,
        field: req.body.field
    }
    let minAgeRestriction = req.body.minAgeRestriction
    if (minAgeRestriction < 1 || minAgeRestriction > 18){
        errorsMessages.push(errorMessage)
        res.status(404).send(errorsMessages)

    }

    if (newVideo){
        videos.push(newVideo)
        res.status(201).send(newVideo);
    }else {
        errorsMessages.push(errorMessage)
        res.status(404).send(errorMessage)
    }



})

app.get('/videos/:id', (req, res)=> {
    const video =  videos.find((c: { id: number; }) => c.id === +req.params.id)
    if (!video){
        res.sendStatus(404)
        return
    }
        res.status(200).send(video);


});

app.put('/videos/:id', (req, res)=> {
    const video = videos.find((c: { id: number; }) => c.id === +req.params.id)
    if (!video){
        res.sendStatus(404)
        return;
    }
    video.title = req.body.title
    res.status(204).send(video);


});

app.delete('/videos/:id', (req, res)=> {
     videos =  videos.filter((c: { id: number; }) => c.id !== +req.params.id)

    res.sendStatus(204)


});

app.delete('/videos', (req, res)=> {
    videos =  [];

    res.sendStatus(204)


});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
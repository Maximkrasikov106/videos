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


app.get('/videos', (req: Request, res: Response)=> {
    res.status(200).send(videos);
});


let createdAt = new Date()
let publicationDate = new Date()
publicationDate.setDate(publicationDate.getDate() +1);

let errorsArray: any = [];

let errorsValue = 0;
const err = {message: "er", find: "err"}

app.post('/videos', (req:Request<{},{},{
    title: string ,
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



    if (req.body.title == null){
        errorsArray.push(err)
        errorsValue++
        res.status(400).send({errorMessages: errorsArray})
        return;
    }

    let minAgeRestriction = req.body.minAgeRestriction
    if ( (minAgeRestriction < 1 || minAgeRestriction > 18)){
        errorsArray.push(err)
        errorsValue++

    }

    if (req.body.title.length > 40){
        errorsArray.push(err)
        errorsValue++

    }

    if (req.body.author.length > 20){
        errorsArray.push(err)
        errorsValue++

    }
    if (req.body.availableResolutions.length < 1){
        errorsArray.push(err)
        errorsValue++

    }
    if (errorsValue > 0){
        res.status(400).json({errorMessages: errorsArray})
        return;
    }
    if (newVideo) {
        videos.push(newVideo)
        res.status(201).send(newVideo);
        return;
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

app.put('/videos/:id', (req:Request<{
    id: number;
},{},{
    title: string,
    author:string,
    canBeDownloaded: boolean,
    minAgeRestriction: number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string,
    message: string,
    field: string,
}>, res: Response)=> {
    const video = videos.find((c: { id: number; }) => c.id === +req.params.id)
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

app.delete('/videos/:id', (req, res)=> {
     let AllVideo =  videos.filter((c: { id: number; }) => c.id !== +req.params.id)
    if(AllVideo.length == videos.length){
        res.sendStatus(404)
        return
    }
    videos = AllVideo
    res.sendStatus(204)


});

app.delete('/videos', (req, res)=> {
    videos =  [];

    res.sendStatus(204)


});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
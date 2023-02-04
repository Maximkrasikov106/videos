import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

export const app = express();
const port = 3000;

let videos:any = [];

const parserMiddleware = bodyParser({});
app.use(parserMiddleware);

app.get('/videos', (req, res)=> {
    res.status(200).send(videos);
});

app.post('/videos', (req, res)=> {
    const newVideo = {id: +new Date(), title: req.body.title}
    videos.push(newVideo)
    res.status(201).send(newVideo);
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


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
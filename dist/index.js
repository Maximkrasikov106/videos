"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.app = (0, express_1.default)();
const port = 3000;
let videos = [];
const parserMiddleware = (0, body_parser_1.default)({});
exports.app.use(parserMiddleware);
exports.app.delete('/testing/all-data', (req, res) => {
    res.sendStatus(204);
});
exports.app.get('/videos', (req, res) => {
    res.status(200).send(videos);
});
let createdAt = new Date();
let publicationDate = new Date();
publicationDate.setDate(publicationDate.getDate() + 1);
let errorsArray = [];
const err = { message: "er", find: "err" };
exports.app.post('/videos', (req, res) => {
    const newVideo = {
        id: +Date.now(),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions: req.body.availableResolutions
    };
    if (req.body.title == null) {
        errorsArray.push(err);
        res.status(400).json({ errorMessages: errorsArray });
        return;
    }
    let minAgeRestriction = req.body.minAgeRestriction;
    if ((minAgeRestriction < 1 || minAgeRestriction > 18)) {
        errorsArray.push(err);
        res.status(400).json({ errorMessages: errorsArray });
        return;
    }
    if (req.body.title.length > 40) {
        errorsArray.push(err);
        res.status(400).json({ errorMessages: errorsArray });
        return;
    }
    if (req.body.author.length > 20) {
        errorsArray.push(err);
        res.status(400).json({ errorMessages: errorsArray });
        return;
    }
    if (req.body.availableResolutions.length < 1) {
        errorsArray.push(err);
        res.status(400).json({ errorMessages: errorsArray });
        return;
    }
    if (newVideo) {
        videos.push(newVideo);
        res.status(201).send(newVideo);
        return;
    }
    else {
        errorsArray.push(err);
        res.status(400).json({ errorMessages: errorsArray });
        return;
    }
});
exports.app.get('/videos/:id', (req, res) => {
    const video = videos.find((c) => c.id === +req.params.id);
    if (!video) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(video);
});
exports.app.put('/videos/:id', (req, res) => {
    const video = videos.find((c) => c.id === +req.params.id);
    if (!video) {
        res.sendStatus(404);
        return;
    }
    if (video) {
        video.title = req.body.title;
        video.author = req.body.author;
        video.availableResolutions = req.body.availableResolutions;
        video.canBeDownloaded = req.body.canBeDownloaded;
        video.minAgeRestriction = req.body.minAgeRestriction;
        video.publicationDate = req.body.publicationDate;
        res.status(204);
    }
});
exports.app.delete('/videos/:id', (req, res) => {
    let AllVideo = videos.filter((c) => c.id !== +req.params.id);
    if (AllVideo.length == videos.length) {
        res.sendStatus(404);
        return;
    }
    videos = AllVideo;
    res.sendStatus(204);
});
exports.app.delete('/videos', (req, res) => {
    videos = [];
    res.sendStatus(204);
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

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
let errorsMessages = [];
let createdAt = new Date();
let publicationDate = new Date(createdAt.setDate(createdAt.getDate() + 1));
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
    const errorMessage = {
        message: req.body.message,
        field: req.body.field
    };
    let minAgeRestriction = req.body.minAgeRestriction;
    if (minAgeRestriction < 1 || minAgeRestriction > 18) {
        res.status(404).send(errorMessage);
    }
    if (newVideo) {
        videos.push(newVideo);
        res.status(201).send(newVideo);
    }
    else {
        res.status(404).send(errorMessage);
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
    video.title = req.body.title;
    res.status(204).send(video);
});
exports.app.delete('/videos/:id', (req, res) => {
    videos = videos.filter((c) => c.id !== +req.params.id);
    res.sendStatus(204);
});
exports.app.delete('/videos', (req, res) => {
    videos = [];
    res.sendStatus(204);
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

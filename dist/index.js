"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const videos_routes_1 = require("./routes/videos-routes");
const testing_routes_1 = require("./routes/testing-routes");
const blogs_router_1 = require("./routes/blogs-router");
exports.app = (0, express_1.default)();
const port = 3000;
const parserMiddleware = (0, body_parser_1.default)({});
exports.app.use(parserMiddleware);
exports.app.use('/testing', testing_routes_1.testingRouter);
exports.app.use('/videos', videos_routes_1.videosRouter);
exports.app.use('/blogs', blogs_router_1.blogsRouter);
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

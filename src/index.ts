import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {videosRouter} from "./routes/videos-routes"
import {testingRouter} from "./routes/testing-routes"
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";
import dotenv from 'dotenv'
import {runDb} from "./DB";
import {usersRouter} from "./routes/users-router";
import {authRouter} from "./routes/auth-router";
import {commentsRouter} from "./routes/comments-router";

dotenv.config()


export const app = express();
const port = 3000;


const parserMiddleware = bodyParser({});
app.use(parserMiddleware);


app.use('/testing', testingRouter)

app.use('/videos', videosRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/comments', commentsRouter)
const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}

startApp()
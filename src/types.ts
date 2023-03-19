import {Request} from "express";

export type RequestWithBody<T> = Request<{
},{}, T>
export type RequestWithQuery<T> = Request<{},{},{},T>
export type RequestWithParams<T> = Request<T>

export type RequestWithBodyAndQuery< T> = Request<{
    title: string;
    id: string;
},{},T>


export type viewBlogModel = {
    id: string ,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string | Date,
    isMembership: boolean
}
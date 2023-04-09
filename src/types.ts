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


export type viewPostModel = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: any,
    createdAt: string | Date ,
    isMembership: boolean
}

export type usersType = {
    id: string,
    login: string,
    email: string,
    createdAt: string | Date
}
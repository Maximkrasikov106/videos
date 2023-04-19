import {Filter, MongoClient} from 'mongodb'
import {blogsRepositoriy, createSortObj} from "./repositories/blogs-db-repositoriy";
import {usersType} from "./types";

const mongoURI = 'mongodb+srv://admin:admin@cluster0.qaoo8bj.mongodb.net/?retryWrites=true&w=majority'

console.log(process.env.MONGO_URL)

export const client = new MongoClient(mongoURI)

export async function runDb() {
    try {
        await client.connect();
        await client.db("product").command({ping:1});
        console.log("Connect to db successful")
    } catch {
        await client.close();
        console.log("don't connect to db")
    }
}


export let DB:TypesVid[] = [
    {
        id:123123,
        title: 'memasd',
        author: 'kek',
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: '2023-02-08T10:06:24.387Z',
        publicationDate: '2023-02-09T10:06:24.387Z',
        availableResolutions: ['P144']
    }
]

export function setDB_Blogs (newBlog:BlogsType[]) {
    DB_Blogs = newBlog
}

export function setDB_Posts (newPost:PostType[]) {
    DB_Posts = newPost
}

export let DB_Blogs:BlogsType[] = [

        {
            id: "232",
            name: "mem4uk",
            description: 'asdasdasd',
            websiteUrl: "https://kek.org",
            createdAt: "1233123",
            isMembership: false
        }
]

export let DB_Posts:PostType[] = [
    {
        id: "333",
        title: "title",
        shortDescription: "short",
        content: "asdasdas",
        blogId: "232",
        blogName: "asdsadasd",
        createdAt: "1233123",
        isMembership: false
    }
]

export type PostType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: any,
    createdAt: string | Date ,
    isMembership: boolean
}



export type BlogsType =  {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string | Date,
    isMembership: boolean
}

export type TypesVid = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    createdAt: string ,
    publicationDate: string,
    availableResolutions:string[]
}

export function getUsersCollection(filter: Filter<usersType>, sortBy: string, sortDirection: string) {

    return  client.db("soc").collection<usersType>('users').find(filter).sort(createSortObj(sortBy, sortDirection)).count()

}

export function getPostComments( sortBy: string, sortDirection: string, postId: string) {

    return  client.db("soc").collection('comments').find({postId: postId}).sort(createSortObj(sortBy, sortDirection)).count()

}


export const db = client.db("soc")
import {BlogsType} from "../DB";
import {viewBlogModel} from "../types";


export function noIdBlog(array: Array<viewBlogModel> ) {

    return array.map((blog) => {


        return {
            id: blog.id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }
    })
}
export function idBlog(blog: viewBlogModel )  {
    return {
            id: blog.id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership

    }
}
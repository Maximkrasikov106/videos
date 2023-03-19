import {BlogsType} from "../DB";
import {viewBlogModel} from "../types";

// @ts-ignore
export function noIdBlog(array: Array<viewBlogModel>) {

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

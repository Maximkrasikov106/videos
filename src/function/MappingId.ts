import {BlogsType} from "../DB";

// @ts-ignore
export function noIdBlog(blog: any) {
    return {
        id: blog._id,
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}


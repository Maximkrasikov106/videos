import {BlogsType, client} from "../DB";
import {viewBlogModel, viewPostModel} from "../types";


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

export function noIdPosts(array: Array<viewPostModel> ) {

    return array.map((post) => {


        return {
            id: post.id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt ,

        }
    })
}

export function noIdPost(post: viewPostModel )  {
    return {
        id: post.id,
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt ,

    }
}



export function  vievQueryP(items: any, sortBy: string, limit: string | number, pageNum: string | number, sortDirection: string, table: string)  {
    let [number, size] = [+pageNum - 1, +limit]
    let totalCount =  client.db("soc").collection(table).findOne({})
    return {
        pagesCount: Math.ceil(12 / size),
        page: +pageNum,
        pageSize: +limit,
        totalCount: 12,
        items: items
    }
}
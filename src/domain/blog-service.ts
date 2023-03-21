import {BlogsType } from "../DB";
import {noIdBlog} from "../function/MappingId";
import {blogsRepositoriy} from "../repositories/blogs-db-repositoriy";
import {foundedBlog} from "../routes/posts-router";

export const blogsService = {
    async getBlogs() {

        let  blogs : BlogsType[] | undefined  = await blogsRepositoriy.getBlogs()
        if (blogs){
            return noIdBlog(blogs)
        }

    },
    async getBlogById(id: string): Promise<BlogsType | null> {

        let  blog: BlogsType | null = await blogsRepositoriy.getBlogById(id)
        return blog ? blog : null

    },
    async createBlog(name: string, description: string, websiteUrl: string): Promise<BlogsType> {
        let newBlog:BlogsType = {
            id: Date.now().toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            isMembership: false,
            createdAt: new Date(Date.now())
        }

        return newBlog = await blogsRepositoriy.createBlog(newBlog)

    },
    async updateBlog(id : string, name: string, description: string,websiteUrl: string ) {
        let update = await blogsRepositoriy.updateBlog(id , name, description,websiteUrl)
        return update > 0;

    },
    async deleteBlog(id: string) {
        let deleteBlog = await blogsRepositoriy.deleteBlog(id)
        return deleteBlog > 0;
    },
    async getBlogPosts(blogId: string) {
        let getPost = await blogsRepositoriy.getBlogPost(blogId)
        return getPost
    },
    async CreateBlogPosts (blogId: string, title : string, shortDescription: string, content: string) {
        let newBlogPost = {
            id: Date.now().toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: await foundedBlog(blogId),
            isMembership: false,
            createdAt: new Date(Date.now())
        }

        return await blogsRepositoriy.CreateBlogPost(newBlogPost)
    }

}
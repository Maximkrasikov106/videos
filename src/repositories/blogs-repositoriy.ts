import {BlogsType, DB_Blogs} from "../DB";

export const blogsRepositoriy = {
    getBlogById(id: string) {
        return DB_Blogs.find(item => item.id === id);
    },
    createBlog(name: string, description: string, websiteUrl: string) {
        let newBlog:BlogsType = {
            id: Date.now().toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        return newBlog
    }
}
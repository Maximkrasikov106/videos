import {BlogsType, DB_Blogs, setDB_Blogs} from "../DB";

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
    },
    updateBlog(id : string, body: BlogsType) {
        let findBlog  = DB_Blogs.find(p => p.id === id)
        let index = DB_Blogs.findIndex(c => c.id === id)
        if (findBlog){
            findBlog = {...findBlog, ...body};
        } else {
            return false
        }
        DB_Blogs.splice(index, 1, findBlog)
        return findBlog
    },
    deleteBlog(id: string) {
        let foundBlogs  = DB_Blogs.filter(item => item.id !== id)
        if (!foundBlogs || foundBlogs.length == DB_Blogs.length) {

            return false
        }
        setDB_Blogs(foundBlogs)

        return; true
    }
}
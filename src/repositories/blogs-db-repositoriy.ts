import {BlogsType, client} from "../DB";

export const blogsRepositoriy = {
    async getBlogs() {

        return await client.db("soc").collection<BlogsType>("blogs").find({}).toArray()

    },
   async getBlogById(id: string): Promise<BlogsType | null> {

       let  blog: BlogsType | null = await client.db("soc").collection<BlogsType>("blogs").findOne({id: id})
       return blog ? blog : null

    },
    async createBlog(newBlog:BlogsType) {

        await client.db("soc").collection<BlogsType>("blogs").insertOne(newBlog)
        return newBlog
    },

    async updateBlog(id : string, name: string, description: string,websiteUrl: string ) {
       let update =  await client.db("soc").
       collection<BlogsType>("blogs").
       updateOne({id: id},
           {$set: {name:name,description: description,websiteUrl: websiteUrl}})
        return update.modifiedCount;

    },
    async deleteBlog(id: string) {
        let deleteBlog = await client.db("soc").collection<BlogsType>("blogs").deleteOne({id :id})
        return deleteBlog.deletedCount;

    },


    async getBlogPost(blogId: string) {
        let foundBlogPost = await client.db("soc").collection("posts").find({blogId: blogId}).toArray()

        return foundBlogPost;
    },
    async CreateBlogPost(newBLogPost : any) {
        await client.db("soc").collection("posts").insertOne(newBLogPost)
        return newBLogPost
    },
    async getPost(blogId: string){
        let foundBlogPost = await client.db("soc").collection("posts").findOne({blogId: blogId})

        return foundBlogPost;
    }


}
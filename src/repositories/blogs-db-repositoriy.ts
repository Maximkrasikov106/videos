import {BlogsType, client, DB_Blogs, setDB_Blogs} from "../DB";

export const blogsRepositoriy = {
    async getBlogs(): Promise<BlogsType[] | null> {

        let  blogs = await client.db("soc").collection<BlogsType>("blogs").find({}).toArray()
        if (blogs){
            return blogs
        }else {
            return null
        }

    },
   async getBlogById(id: string): Promise<BlogsType | null> {

       let  blog: BlogsType | null = await client.db("soc").collection<BlogsType>("blogs").findOne({id: id})
       return blog ? blog : null

    },
    async createBlog(name: string, description: string, websiteUrl: string) {
        let newBlog:BlogsType = {
            id: Date.now().toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            sMembership: false,
            createdAt: new Date(Date.now()).toString()
        }

        await client.db("soc").collection<BlogsType>("blogs").insertOne(newBlog)
        return newBlog
    },
    async updateBlog(id : string, name: string, description: string,websiteUrl: string ) {
       let update =  await client.db("soc").
       collection<BlogsType>("blogs").
       updateOne({id: id},
           {$set: {name:name,description: description,websiteUrl: websiteUrl}})
        return update.modifiedCount > 0;

    },
    async deleteBlog(id: string) {
        let deleteBlog = await client.db("soc").collection<BlogsType>("blogs").deleteOne({id :id})
        return deleteBlog.deletedCount > 0;

    }
}
import {BlogsType, client, DB_Blogs, setDB_Blogs} from "../DB";
import {noIdBlog} from "../function/MappingId";

export const blogsRepositoriy = {
    async getBlogs() {

        let  blogs : BlogsType[]  = await client.db("soc").collection<BlogsType>("blogs").find({}).toArray()
        if (blogs){
            return noIdBlog(blogs)
        }

    },
   async getBlogById(id: string): Promise<BlogsType[] | null> {

       let  blog: BlogsType[] | null = await client.db("soc").collection<BlogsType[]>("blogs").findOne({id: id})
       return blog ? noIdBlog(blog) : null

    },
    async createBlog(name: string, description: string, websiteUrl: string) {
        let newBlog:BlogsType = {
            id: Date.now().toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            isMembership: false,
            createdAt: new Date(Date.now())
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
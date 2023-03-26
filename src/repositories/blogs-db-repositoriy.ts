import {BlogsType, client} from "../DB";
export const createSortObj = (sortKey: string, sortDirection: string) => {
    let sortOj: any = {}

    sortOj[sortKey] = sortDirection === 'asc' ? 1 : -1
    console.log(sortOj)
    return sortOj
}


export const blogsRepositoriy = {
    
        async getCount(sortBy: string, limit: string | number, pageNum: string | number, sortDirection: string, x: string, SearchNameTerm: string = '') {

            let [number, size] = [+pageNum - 1, +limit]
            const skipElemCount = number * size


            let x1 =  await client.db("soc").collection(x).find(SearchNameTerm ? {name: {$regex: `${SearchNameTerm}`}} : {}).sort(createSortObj(sortBy, sortDirection)).count()
            console.log(x1, 5)
            return x1

        }
    ,
    async getBlogs(sortBy: string, limit: string | number, pageNum: string | number, sortDirection: string, SearchNameTerm: string = '') {

        let [number, size] = [+pageNum - 1, +limit]
        const skipElemCount = number * size
        if (SearchNameTerm.length > 1 ) {
            return await client.db("soc").collection<BlogsType>("blogs").find({name: {$regex: SearchNameTerm + '/i'}}).sort(createSortObj(sortBy, sortDirection)).skip(skipElemCount).limit(size).toArray()

        }

        return await client.db("soc").collection<BlogsType>("blogs").find({name: {$regex: SearchNameTerm + '/i'}}).sort(createSortObj(sortBy, sortDirection)).skip(skipElemCount).limit(size).toArray()

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


    async getBlogPost(blogId: string, sortBy: string, limit: string | number, pageNum: string | number, sortDirection: string) {


        let [number, size] = [+pageNum - 1, +limit]

        const skipElemCount = number * size
        let foundBlogPost = await client.db("soc").collection("posts").find({blogId: blogId}).sort(createSortObj(sortBy, sortDirection)).skip(skipElemCount).limit(size).toArray()

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
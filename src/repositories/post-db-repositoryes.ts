import {BlogsType, client, DB_Blogs, PostType, setDB_Blogs} from "../DB";
import {foundedBlog} from "../routes/posts-router";
import {createSortObj} from "./blogs-db-repositoriy";


export const postsRepositoriy = {
    async getPostById(id: string): Promise<PostType | null> {
        let post: PostType | null = await client.db("soc")
            .collection<PostType>("posts").findOne({id: id})
        return post || null;
    },

    async getPosts(sortBy: string, limit: string | number, pageNum: string | number, sortDirection: string): Promise<PostType[] | null> {

        let [number, size] = [+pageNum - 1, +limit]
        const skipElemCount = number * size

        let posts: PostType[] | null = await client.db("soc")
            .collection<PostType>("posts").find({}).sort(createSortObj(sortBy, sortDirection)).skip(skipElemCount).limit(size).toArray()

        return posts || null;
    },
    async createPost( newPost: PostType ) {

        await client.db("soc").collection<PostType>("posts").insertOne(newPost)
        return newPost
    }, async updatePost(id: string, title: string, shortDescription: string, content: string,
                        blogId: string  ) {
        let update =  await client.db("soc").
        collection<PostType>("posts").
        updateOne({id: id},
            {$set: {title:title,shortDescription: shortDescription,content: content,blogId: blogId }})
        return update.modifiedCount;

    },async deletePost(id: string) {
        let deletePost = await client.db("soc").collection<PostType>("posts").deleteOne({id :id})
        return deletePost.deletedCount;

    },



}
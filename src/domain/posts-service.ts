import {PostType} from "../DB";
import {foundedBlog} from "../routes/posts-router";
import {postsRepositoriy} from "../repositories/post-db-repositoryes";


export const postsService = {
    async getPostById(id: string): Promise<PostType | null> {
        let post: PostType | null = await postsRepositoriy.getPostById(id)
        return post || null;
    },

    async getPosts(): Promise<PostType[] | null> {
        let posts: PostType[] | null = await postsRepositoriy.getPosts()
        return posts || null;
    },
    async createPost( title: string, shortDescription: string, content: string,
                      blogId: string ) {

        let newPost:PostType = {
            id: Date.now().toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: await foundedBlog(blogId),
            isMembership: false,
            createdAt: new Date(Date.now())
        }

        return await postsRepositoriy.createPost(newPost)

    }, async updatePost(id: string, title: string, shortDescription: string, content: string,
                        blogId: string  ) {
        let update = await postsRepositoriy.updatePost(id, title, shortDescription, content,
            blogId)
        return update > 0;

    },async deletePost(id: string) {
        let deletePost = await postsRepositoriy.deletePost(id)
        return deletePost > 0;

    }


}
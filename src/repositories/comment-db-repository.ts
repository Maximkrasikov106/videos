import {db} from "../DB";
import {usersType} from "../types";

export const commentRepository = {
    async addNewComment(postId: string, content: string, userParams: any, createdAt: string | Date) {
        let addComment = await db.collection('comments')
            .insertOne({
                postId: postId,
                content: content,
                commentatorInfo: userParams,
                createdAt: createdAt  })
        let newComment = await db.collection('comments').findOne({}, {sort: {_id: -1}, limit: 1 });
        return newComment;
    },
    async findComments() {

    }
}
import {BlogsType, client, db} from "../DB";
import {usersType} from "../types";
import {ObjectId} from "bson";

export const commentRepository = {
    async addNewComment(postId: string, content: string, userParams: any, createdAt: string | Date) {
        let addComment = await db.collection('comments')
            .insertOne({
                postId: postId,
                content: content,
                commentatorInfo: userParams,
                createdAt: createdAt
            })
        let newComment = await db.collection('comments').findOne({}, {sort: {_id: -1}, limit: 1});
        return newComment;
    },
    async findComments(id: string) {
        if (ObjectId.isValid(id)) {
            let o_id = new ObjectId(id);
            return  await db.collection('comments').findOne({_id: o_id})

        }
    },
    async deleteComments(id: string) {
        if (ObjectId.isValid(id)) {
            let o_id = new ObjectId(id)
            let deleteComment = await db.collection('comments').deleteOne({_id: o_id})
            return deleteComment.deletedCount > 0
        }
    },
    async updateComment(id:string, content: string) {
        if (ObjectId.isValid(id)) {
            let o_id = new ObjectId(id)
            let update = await db.collection("comments").updateOne({_id: o_id},
                {$set: {content: content}})
            return update.modifiedCount;
        }
    }
}
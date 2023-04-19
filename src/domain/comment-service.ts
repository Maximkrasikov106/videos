import {commentRepository} from "../repositories/comment-db-repository";
import {usersRepository} from "../repositories/users-db-repositoryes";
import {vievUserModelForComments} from "../function/MappingId";

export const commentService = {
    async addNewComment(postsId: string, content: string, userId: string ){
        let createDate: String | Date = new Date(Date.now())
        let userData: any = await usersRepository.getUser(userId);
        userData = vievUserModelForComments(userData)
        if (userData){
            let newComment = commentRepository.addNewComment(postsId, content, userData, createDate)
            return  newComment
        }else {
            return undefined
        }

    },
    async findComents(id: string) {
        return commentRepository.findComments(id)
    },
    async deleteComment(id: string) {
        return commentRepository.deleteComments(id)
    }

}
import {commentRepository} from "../repositories/comment-db-repository";
import {usersRepository} from "../repositories/users-db-repositoryes";
import {vievUserModelForComments} from "../function/MappingId";
import {setting} from "../setting";
import {strict} from "assert";

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
    async findAllcoments() {
        return commentRepository.findComments()
    }
}
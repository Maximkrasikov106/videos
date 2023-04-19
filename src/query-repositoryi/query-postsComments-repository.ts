import {Filter} from "mongodb";
import {usersType} from "../types";
import {client, getPostComments, getUsersCollection} from "../DB";
import {viewComments, viewUsers} from "../function/MappingId";

export const queryPostsCommentsRepository = {
    async getPostComments(pageSize: number, sortBy: string, pageNum: number, sortDirection: string, postId: string)  {
        const skipSize = (pageNum - 1) * pageSize;
        const totalCount : number = await getPostComments(sortBy, sortDirection, postId)

        const pageCount = Math.ceil(totalCount / +pageSize)
        const getComments  = await client.db("soc").collection('comments').find({postId: postId}).sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
            .skip(skipSize)
            .limit(+pageSize)
            .toArray()
        console.log(getComments, 'comments')
        const mappedComments =  viewComments(getComments)

        return {
            pagesCount: pageCount,
            page: +pageNum,
            pageSize: +pageSize,
            totalCount: totalCount,
            items: mappedComments
        }
    }
}
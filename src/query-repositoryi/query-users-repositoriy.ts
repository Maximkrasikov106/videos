import {Filter} from "mongodb";
import {usersType} from "../types";
import {client, getUsersCollection} from "../DB";
import { viewUsers} from "../function/MappingId";

export const queryUsersRepositoriy = {
    async getUsers(pageSize: number, sortBy: string, pageNum: number, sortDirection: string, searchLoginTerm: string, searchEmailTerm: string)  {
        const skipSize = (pageNum - 1) * pageSize;
        const filter: Filter<usersType> = {
            $or : [{login: {$regex: searchLoginTerm ?? "", $options: 'i'}},
                {email: {$regex: searchEmailTerm ?? "", $options: 'i'}}]
        };
        const totalCount : number = await getUsersCollection(filter, sortBy, sortDirection)

        const pageCount = Math.ceil(totalCount / pageSize)
        const getUsers  = client.db("soc").collection<usersType>('users').find(filter).sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
            .skip(skipSize)
            .limit(pageSize)
            .toArray()

        const mappedUsers = viewUsers(getUsers)
        return {
            pagesCount: pageCount,
            page: +pageNum,
            pageSize: pageSize,
            totalCount: totalCount,
            items: mappedUsers
        }
    }
}
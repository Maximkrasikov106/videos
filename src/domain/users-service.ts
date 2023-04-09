import {usersRepository} from "../repositories/users-db-repositoryes";
import {usersType} from "../types";
import {getPaginationValues} from "../utils/pagination/pagination";

export const usersService = {
    async getUsers(query: any) {


        // let [number, size] = [+pageNum - 1, +pageSize]
        // const skipElemCount = number * size

        return  await usersRepository.getUsers()
    },
    async addUser(req : usersType) {
        let user: usersType = {
            id: req.id,
            login: req.login,
            email: req.email,
            createdAt: new Date(Date.now())
        }
        let newUser: usersType = await usersRepository.addUser(user)
            return  newUser
        },
    async deleteUser(id: string ) {
        return await usersRepository.deleteUser(id)
    }


}
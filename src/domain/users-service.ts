import {usersRepository} from "../repositories/users-db-repositoryes";
import {userDbType, usersType} from "../types";
import {getPaginationValues} from "../utils/pagination/pagination";
import {vievUserModel, viewUser,} from "../function/MappingId";
import bcrypt from 'bcrypt'
export const usersService = {
    async getUsers(query: any) {

        return  await usersRepository.getUsers()
    },
    async addUser(req : usersType) {
        const passwordSalt = await bcrypt.genSalt(10)
            const passwordHash = await this._generateHash(req.password, passwordSalt)
        let user: userDbType = {
            id: req.id,
            login: req.login,
            passwordHash: passwordHash,
            passwordSalt: passwordSalt,
            email: req.email,
            createdAt: new Date(Date.now())
        }
        let newUser: usersType = await usersRepository.addUser(user)
            return  viewUser(newUser)
        },
    async deleteUser(id: string ) {
        return await usersRepository.deleteUser(id)
    },
    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    },
    async checkLog(loginOrEmail : string, password : string) {
        const user = await usersRepository.findByLoginOrEmail(loginOrEmail)
        if(!user ) return false

        const passwordHash = await this._generateHash(password, user.passwordSalt)
        if (passwordHash == user.passwordHash){
            return user;
        }else {
            return false;
        }

    },
    async getUserIdByToken(userId: any) {

        let user = await usersRepository.getUser(userId);
        return user


    }


}
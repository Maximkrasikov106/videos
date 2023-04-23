import bcrypt from "bcrypt";
import {ObjectId} from "bson";
import { v4 as uuidv4 } from 'uuid';
import add from "date-fns/add"
import {registerDbRepository} from "../repositories/register-db-repository";
import {emailManger} from "../managers/emailManger";
export const registerService = {
    async createUser(login: string, password: string, email: string) {
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)
        let user = {
            _id: new ObjectId(),
                login: login,
                passwordHash,
                passwordSalt,
                email,
                createdAt: new Date(),

            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 3
                }),
                isComposing: false
            }

        }
        const createResult = await registerDbRepository.saveUser(user)
        await emailManger.sendEmailConfirmMessager(user.email, user.emailConfirmation.confirmationCode )
        return createResult
    },
    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    },
    async checkEmail(code: string) {
        let updateCode =  await registerDbRepository.updateByCode(code)
        let user = await registerDbRepository.userByCode(code);
        if (!user) return false
        await emailManger.sendEmailConfirmMessager(user.email, user.emailConfirmation.confirmationCode )
        return updateCode
    },
    async emailResending(email: string) {
       let user = await  registerDbRepository.findUserForEmail(email)
        if (!user) return false
        let newCode = uuidv4()
        console.log(newCode)
        console.log(email)
        let updatedUser = await registerDbRepository.updateCode(email ,newCode);
        console.log(updatedUser)
        let newUser = await registerDbRepository.findUserForEmail(email)
        if (!newUser) return false
        let kk =  await emailManger.sendEmailConfirmMessager(newUser.email, newUser.emailConfirmation.confirmationCode)
        console.log(kk)
        return user
    }
}

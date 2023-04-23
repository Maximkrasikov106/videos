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
            accountData: {
                login: login,
                passwordHash,
                passwordSalt,
                email,
                createdAt: new Date(),
            },
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
        await emailManger.sendEmailConfirmMessager(user.accountData.email, user.emailConfirmation.confirmationCode )
        return createResult
    },
    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    },
    async checkEmail(code: string) {
        return await registerDbRepository.updateCode(code)
    },
    async emailResending(email: string) {
       let user = await  registerDbRepository.findUserForEmail(email)
        if (!user) return false
        if (user.isComposing == true) return false
        await emailManger.sendEmailConfirmMessager(user.accountData.email, user.emailConfirmation.confirmationCode)
        return true
    }
}

import {db} from "../DB";

export const registerDbRepository = {
    async saveUser(user: any)  {
        return await db.collection('users').insertOne(user)
    },
    async updateByCode(code: string) {
        return await db.collection('users').updateOne({"emailConfirmation.confirmationCode": code },{ $set: { "isComposing": true}})
    },
    async findUserForEmail(email:string) {
        return await db.collection('users').findOne({"accountData.email": email})
    },
    async userByCode(code: string) {
       return   await db.collection('users').findOne({"emailConfirmation.confirmationCode": code })
    },
    async updateCode(email: string, code: string) {
        return await db.collection('users').updateOne({"accountData.email": email },{ $set: { "emailConfirmation.confirmationCode": code}})
    }

}
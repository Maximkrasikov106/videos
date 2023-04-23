import {db} from "../DB";

export const registerDbRepository = {
    async saveUser(user: any)  {
        return await db.collection('users').insertOne(user)
    },
    async updateCode(code: string) {
        return await db.collection('users').updateOne({"emailConfirmation.confirmationCode": code },{ $set: { "isComposing": true}})
    },
    async findUserForEmail(email:string) {
        return await db.collection('users').findOne({"accountData.email": email})
    },
    async userByCode(code: string) {
       return   await db.collection('users').findOne({"emailConfirmation.confirmationCode": code })
    }
}
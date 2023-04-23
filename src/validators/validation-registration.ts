import {body, param, validationResult} from "express-validator";
import {client, db} from "../DB";


export const codeValidate = body('code', ).custom( async (code) => {
    const codeUser = await db.collection("users").findOne({"emailConfirmation.confirmationCode": code})
    if (codeUser == null) {
        throw new Error('code');
    }
    if (codeUser == code) return true
}).withMessage('code')

export const emailExictValidate = body('email', ).custom( async (email) => {


    const emailExict = await db.collection("users").findOne({"accountData.email": email})
    console.log(emailExict)
    if (emailExict) throw new Error('blogId');
}).withMessage('email')

export const loginExictValidate = body('login', ).custom( async (email) => {

    const loginExict = await db.collection("users").findOne({"accountData.login": email})
    console.log(loginExict)
    if (loginExict)  throw new Error('blogId');
}).withMessage('login')
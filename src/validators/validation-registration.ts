import {body, param, validationResult} from "express-validator";
import {client, db} from "../DB";


export const codeValidate = param('code', ).custom( async (code) => {
    const codeUser = await db.collection("users").findOne({"emailConfirmation.confirmationCode": code})
    if (codeUser == null) {
        return false
    }
    if (codeUser == code) return true
}).withMessage('code')

export const emailExictValidate = param('email', ).custom( async (email) => {
    const emailExict = await db.collection("users").findOne({"accountData.email": email})
    if (emailExict) return false
}).withMessage('email')

export const loginExictValidate = param('login', ).custom( async (email) => {
    const loginExict = await db.collection("users").findOne({"accountData.login": email})
    if (loginExict) return false
}).withMessage('login')
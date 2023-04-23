import {body, param, validationResult} from "express-validator";
import {client, db} from "../DB";


export const codeValidate = body('code', ).custom( async (code) => {
    const codeUser = await db.collection("users").findOne({"emailConfirmation.confirmationCode": code})
    if (codeUser == null || codeUser.isComposing == true) {
        throw new Error('code');
    }
    if (codeUser == code) return true
}).withMessage('code')

export const emailExictValidate = body('email', ).custom( async (email) => {
    const emailExict = await db.collection("users").findOne({"accountData.email": email})
    console.log(emailExict)
    if (emailExict) throw new Error('email');
}).withMessage('email')

export const loginExictValidate = body('login', ).custom( async (login) => {
    const loginExict = await db.collection("users").findOne({"accountData.login": login})
    console.log(loginExict)
    if (loginExict)  throw new Error('login');
}).withMessage('login')

export const emailValidateReg = body('email', ).custom( async (email) => {
    const emailValid = await db.collection("users").findOne({"accountData.email": email})
    if (!emailValid)  throw new Error('email');
    if (emailValid.isComposing == true) throw new Error('email');
}).withMessage('login')

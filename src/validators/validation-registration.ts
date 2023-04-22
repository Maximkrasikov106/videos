import {body, param, validationResult} from "express-validator";
import {client, db} from "../DB";


export const codeValidate = param('code', ).custom( async (code) => {
    const codeUser = await db.collection("users").findOne({"emailConfirmation.confirmationCode": code})
    if (codeUser == null) {
        throw new Error('code');
    }
    if (codeUser == code) return true
}).withMessage('code')
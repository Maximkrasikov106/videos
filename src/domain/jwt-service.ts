import {usersType} from "../types";
import jwt from 'jsonwebtoken'
import {setting} from "../setting";
import {ObjectId} from "bson";

export const jwtService ={
    async createJwt(user: any) {
        const token = jwt.sign({userId: user._id}, setting.JWT_SECRET, {expiresIn: '1h'})

        return {
            accessToken: token
        }
    },
    async getUserByIdToken(token: string) {
        debugger

        try {
            const result: any = await jwt.verify(token, setting.JWT_SECRET)
            console.log(result, 'result')
            return new ObjectId(result.userId)
        } catch (error) {
            return null
        }
    }
}
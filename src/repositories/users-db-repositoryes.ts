import {client} from "../DB";
import {usersMeType, usersType} from "../types";
import { ObjectId } from 'bson';
import {usersService} from "../domain/users-service";
export const usersRepository = {
    async findByLoginOrEmail(loginOrEmail: string) {

        let user = await client.db("soc")
            .collection("users").findOne({ $or : [{'login': loginOrEmail}, {'email': loginOrEmail}]})
        console.log(user);
        return user
    },
    async getUsers() {
        let user :usersType[] = await client.db("soc")
            .collection<usersType>("users").find({}).toArray();
        return user
    },
    async addUser(user : any) {
        let add = await client.db("soc").collection<usersType>("users").insertOne(user);
            return user
    },
    async deleteUser (id: string ) {
        if (ObjectId.isValid(id)){
            let o_id = new ObjectId(id);
            let deletedUser = await client.db("soc").collection<usersType>("users")
                .deleteOne({_id: o_id });
            console.log(deletedUser)
            return deletedUser.deletedCount > 0

        }else {
            return false;
        }
        },
    async getUser(id : string) {

        if (ObjectId.isValid(id)) {
            let o_id = new ObjectId(id);
            let user = await client.db("soc").collection("users").findOne({_id: o_id})
            return user
        }
    }
}
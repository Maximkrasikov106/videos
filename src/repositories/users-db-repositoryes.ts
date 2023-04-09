import {client} from "../DB";
import {usersType} from "../types";

export const usersRepository = {
    async getUsers() {
        let user :usersType[] = await client.db("soc")
            .collection<usersType>("users").find({}).toArray();
        return user
    },
    async addUser(user : any) {
        let add = await client.db("soc").collection<usersType>("users").insertOne(user);
            return user
    },
    async deleteUser (id: string) {
        let deletedUser = await client.db("soc").collection("users")
            .deleteOne({id: id});
        return deletedUser.deletedCount > 0

    }

}
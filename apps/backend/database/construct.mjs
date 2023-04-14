import {db} from "./init.mjs";
import {users} from "./users.mjs";
import {User} from "../models/User.mjs";
import {trainings} from "./trainings.mjs";
import {Training} from "../models/Training.mjs";


export async function createTables(){
    await db.sync({ force: true });
    console.log("Creating users");
    for (const user of users) {
        console.log(user)
        await User.create(user);
    }
    console.log("Creating trainings");
    for (const training of trainings) {
        console.log(training)
        await Training.create(training);
    }

}



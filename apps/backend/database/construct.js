const {db} = require('./init')
const {User} = require('../models/User')
const {Training} = require('../models/Training')
const {users} = require("./users");
const {trainings} = require("./trainings");

async function createTables(){
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

module.exports = {
    createTables: createTables,
}

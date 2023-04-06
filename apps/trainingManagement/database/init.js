const Sequelize = require('sequelize');
const db = new Sequelize('aass', 'aass', 'LetLeo!123', {
    host: 'aass.postgres.database.azure.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true, // This will help you. But you will see nwe error
            rejectUnauthorized: false // This line will fix new error
        }
    },
});

async function testDb(){
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    db: db,
    testDb: testDb,
}

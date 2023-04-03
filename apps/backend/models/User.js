const Sequelize = require('sequelize');
const {db} = require('../database/init');
const {Training} = require("./Training");

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING,
    defaultValue: "customer"
  },
})

module.exports = {
  User: User,
}

User.hasMany(Training, { as: 'CreatedTrainings', foreignKey: 'trainer_id' });
User.belongsToMany(Training, { as: 'VisitedTrainings', through: 'training_customer', foreignKey: 'customer_id' });
Training.belongsTo(User, { as: 'Trainer', foreignKey: 'trainer_id' });
Training.belongsToMany(User, { as: 'Customers', through: 'training_customer', foreignKey: 'training_id' });

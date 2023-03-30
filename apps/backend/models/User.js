const Sequelize = require('sequelize');
const {db} = require('../database/init');

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

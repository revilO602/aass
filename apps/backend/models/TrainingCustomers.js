const Sequelize = require('sequelize');
const {db} = require('../database/init');

const TrainingCustomer = db.define('training_customer', {
  training_id: {
    type: Sequelize.INTEGER
  },
  customer_id: {
    type: Sequelize.INTEGER
  },
  confirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
})

module.exports = {
  TrainingCustomer: TrainingCustomer,
}


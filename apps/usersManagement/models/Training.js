const Sequelize = require('sequelize');
const {db} = require('../database/init');

const Training = db.define('training', {
  trainer_id: {
    type: Sequelize.INTEGER
  },
  duration_min: {
    type: Sequelize.INTEGER
  },
  calories_per_min: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
})




module.exports = {
  Training: Training,
}

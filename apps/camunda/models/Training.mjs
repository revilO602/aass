import {Sequelize} from "sequelize";
import {db} from "../database/init.mjs";


export const Training = db.define('training', {
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


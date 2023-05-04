import {Sequelize} from "sequelize";
import {db} from "../database/init.mjs";

export const TrainingCustomer = db.define('training_customer', {
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



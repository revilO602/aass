// Oliver Leontiev

import {Training} from "./models/Training.mjs";
import express from "express";
import cors from "cors";
import {testDb} from "../authentication/database/init.mjs";
import {Kafka} from "kafkajs";
import {TrainingCustomer} from "../confirmations/models/TrainingCustomers.mjs";
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})
const consumer = kafka.consumer({ groupId: 'training-confirmed' })

await consumer.connect()
await consumer.subscribe({ topic: 'training-confirmed', fromBeginning: true })

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const training_id = JSON.parse(message.value.toString()).training_id
    console.log({
      training_id: training_id,
    })
    const training = await Training.findByPk(parseInt(training_id));
    const caloriesBurned = training.duration_min * training.calories_per_min
    console.log("You burned " + caloriesBurned.toString() + " calories");
  },
})

const server = express();
const port = 8083;
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors({
  origin: '*'
}));
// server.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

server.listen(port, () => {
  console.log(`Statistics running at http://localhost:${port}`);
});

server.get('/trainings/:trainingId/calculate', async (req, res) => {
  try {
    const training = await Training.findByPk(parseInt(req.params.trainingId));
    if (training === null) {
      res.status(404).send({
        message:
          "Not found."
      });
    } else {
      const caloriesBurned = training.duration_min * training.calories_per_min
      console.log("You burned " + caloriesBurned.toString() + " calories");
      res.send(JSON.stringify({message: "You burned " + caloriesBurned.toString() + " calories"}));
    }
  } catch(error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving products."
    });
  }
})
testDb()





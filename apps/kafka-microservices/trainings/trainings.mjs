// Oliver Leontiev

import {TrainingCustomer} from "./models/TrainingCustomers.mjs";
import {Training} from "./models/Training.mjs";
import express from "express";
import cors from "cors";
import {testDb} from "../authentication/database/init.mjs";
import {Kafka} from "kafkajs";


const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})
const producer = kafka.producer()

const server = express();
const port = 8084;
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
  console.log(`Trainigs Management running at http://localhost:${port}`);
});

server.get('/trainings', async (req, res) => {
  try {
    const trainings = await Training.findAll();
    console.log(JSON.stringify(trainings));
    res.send(JSON.stringify(trainings));
  } catch(error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving products."
    });
  }
})

server.post('/trainings/:trainingId/reserve', async (req, res) => {
  try {
    const training = await Training.findByPk(parseInt(req.params.trainingId));
    if (training === null) {
      res.status(404).send({
        message:
          "Not found."
      });
    } else {
      const customerId = req.body.customer_id
      //await TrainingCustomer.create({training_id: training.id, customer_id: customerId})
      res.status(201).send()
      await producer.connect()
      await producer.send({
        topic: 'training-reserved',
        messages: [
          {value: JSON.stringify({ training_id: training.id,  customer_id: customerId})},
        ],
      })
      await producer.disconnect()
    }
  } catch(error) {
    console.log(error)
  }
})

testDb()


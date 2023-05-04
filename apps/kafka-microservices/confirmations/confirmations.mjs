// Oliver Leontiev

import {TrainingCustomer} from "./models/TrainingCustomers.mjs";
import express from "express";
import cors from "cors";
import {testDb} from "../authentication/database/init.mjs";
import {Kafka} from "kafkajs";

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})
const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'training-reserved' })

await consumer.connect()
await consumer.subscribe({ topic: 'training-reserved', fromBeginning: true })

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const training_id = JSON.parse(message.value.toString()).training_id;
    const customer_id = JSON.parse(message.value.toString()).customer_id;
    console.log({
      training_id: training_id,
      customer_id: customer_id,
    })
    await TrainingCustomer.create({training_id: training_id, customer_id: customer_id})
  },
})

const server = express();
const port = 8082;
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
  console.log(`Confirmations running at http://localhost:${port}`);
});


server.get('/trainings/confirmations', async (req, res) => {
  try {
    const trainings = await TrainingCustomer.findAll({where: {confirmed: false}});
    console.log(JSON.stringify(trainings));
    res.send(JSON.stringify(trainings));
  } catch(error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving products."
    });
  }
})

server.post('/trainings/confirmations/:trainingId/confirm', async (req, res) => {
  try {
    const training = await TrainingCustomer.findByPk(parseInt(req.params.trainingId));
    if (training === null) {
      res.status(404).send({
        message:
          "Not found."
      });
    } else {
      training.confirmed = true;
      await training.save()
      res.status(201).send()
      await producer.connect()
      await producer.send({
        topic: 'training-confirmed',
        messages: [
          {value: JSON.stringify({ training_id: training.id})},
        ],
      })
      await producer.disconnect()
    }
  } catch(error) {
    console.log(error)
  }
})
testDb()



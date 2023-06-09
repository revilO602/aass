// Oliver Leontiev

import {createTables} from "./database/construct.mjs";
import * as http from "http";
import {TrainingCustomer} from "./models/TrainingCustomers.mjs";
import {Training} from "./models/Training.mjs";
import {User} from "./models/User.mjs";
import express from "express";
import {testDb} from "./database/init.mjs";
import cors from "cors";

const server = express();
const port = 8080;
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

server.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email, password: req.body.password } })
    if (user === null) {
      res.status(401).send({
        message:
          "Not authorized."
      });
    } else {
      res.send(JSON.stringify(user));
    }

  } catch(error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving products."
    });
  }
})

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
      await TrainingCustomer.create({training_id: training.id, customer_id: customerId})
      res.status(201).send()
    }
  } catch(error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving products."
    });
  }
})

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
      training.save()
      http.get(`http://localhost:8080/trainings/${training.training_id}/calculate`, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          console.log(data);
          res.status(201).send(data)
        });

      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
    }
  } catch(error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving products."
    });
  }
})
// confirm by customer
testDb()
//createTables()


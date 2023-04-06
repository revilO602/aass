// Oliver Leontiev

const {testDb} = require('./database/init');

const express = require('express');
const {createTables} = require("./database/construct");
const {Training} = require("./models/Training");
const {User} = require("./models/User");
const {TrainingCustomer} = require("./models/TrainingCustomers");

const server = express();
const port = 8080;
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

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
    const trainings = await TrainingCustomer.findAll();
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
      await TrainingCustomer.build({training_id: training.id, customer_id: customerId})
      res.status(201).send()
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
createTables()


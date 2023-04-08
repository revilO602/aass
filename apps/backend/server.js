// Oliver Leontiev

const {testDb} = require('./database/init');

const express = require('express');
const cors = require('cors');
const {createTables} = require("./database/construct");
const {Training} = require("./models/Training");

const server = express();
const port = 8080;
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());
server.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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

server.get('/trainings/:trainingId/reserve', async (req, res) => {
  try {
    const training = await Training.findByPk(parseInt(req.params.trainingId));
    if (training === null) {
      res.status(404).send({
        message:
          "Not found."
      });
    } else {
      console.log(JSON.stringify(training));
      res.send(JSON.stringify(training));
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

// confirm by trainer
// confirm by customer
testDb()
//createTables()


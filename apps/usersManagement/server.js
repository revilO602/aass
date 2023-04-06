// Oliver Leontiev

const {testDb} = require('./database/init');

const express = require('express');
const {createTables} = require("./database/construct");
const trainingsRouter = require("./routers/trainingsRouter");
const {Training} = require("../models/Training");

const server = express();
const port = 8080;
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.listen(port, () => {
  console.log(`Trainigs Management running at http://localhost:${port}`);
});

trainingsRouter.get('/', async (req, res) => {
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

trainingsRouter.get('/:trainingId/reserve', async (req, res) => {
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
// calculate and log total calories burned
// confirm by trainer
// confirm by customer
testDb()
createTables()


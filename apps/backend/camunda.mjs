import {Client, logger, Variables} from "camunda-external-task-client-js";
import {User} from "./models/User.mjs";
import {Training} from "./models/Training.mjs";
import {TrainingCustomer} from "./models/TrainingCustomers.mjs";

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

client.subscribe("auth", async function({ task, taskService }) {
  const email = await task.variables.get("email");
  const password = await task.variables.get("password");
  //console.log(email, password);
  const user = await User.findOne({ where: { email: email, password: password } })
  const variables = await new Variables().set('customer_id', user.id);
  await taskService.complete(task, variables);
});

client.subscribe("listTrainings", async function({ task, taskService }) {
  const trainings = await Training.findAll();
  //const parsedTraining = Object.assign({}, ...trainings.map((t) => ({[t.id]: t.name})));
  //const parsedTraining = trainings.map(t => ({[t.id]: t.name}))
  const parsedTraining = trainings.map(t => ({"label": t.name, "value": t.id}))
  console.log(JSON.stringify(parsedTraining))
  const variables = await new Variables().set('trainings', parsedTraining);
  await taskService.complete(task, variables);
});

client.subscribe("confirmation", async function({ task, taskService }) {
  const trainingId = task.variables.get("trainingId");
  const customerId = task.variables.get("customerId");
  await TrainingCustomer.create({training_id: trainingId, customer_id: customerId, confirmed: true})
  await taskService.complete(task);
});

client.subscribe("calc", async function({ task, taskService }) {
  const trainingId = task.variables.get("trainingId");
  const training = await Training.findByPk(parseInt(trainingId));
  const caloriesBurned = training.duration_min * training.calories_per_min;
  console.log("You burned " + caloriesBurned.toString() + " calories");
  await taskService.complete(task);
});

import {Client, logger, Variables} from "camunda-external-task-client-js";
import {User} from "./models/User.mjs";
import {Training} from "./models/Training.mjs";

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

client.subscribe("auth", async function({ task, taskService }) {
  const email = task.variables.get("email");
  const password = task.variables.get("password");
  const user = await User.findOne({ where: { email: email, password: password } })
  const variables = new Variables().set('customer_id', user.id);
  await taskService.complete(task, variables);
});


client.subscribe("calc", async function({ task, taskService }) {
  const trainingId = task.variables.get("trainingId");
  const training = await Training.findByPk(parseInt(trainingId));
  const caloriesBurned = training.duration_min * training.calories_per_min;
  console.log("You burned " + caloriesBurned.toString() + " calories");
  //res.send(JSON.stringify({message: "You burned " + caloriesBurned.toString() + " calories"}));
  await taskService.complete(task);
});

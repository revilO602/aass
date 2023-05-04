// Oliver Leontiev

import {User} from "./models/User.mjs";
import express from "express";
import {testDb} from "./database/init.mjs";
import cors from "cors";

const server = express();
const port = 8081;
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
  console.log(`Authentication running at http://localhost:${port}`);
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

testDb()


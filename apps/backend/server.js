// Oliver Leontiev

const {testDb} = require('./database/init');

const express = require('express');

const server = express();
const port = 8080;
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

testDb()


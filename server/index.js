const express = require("express");
const app = express();
const db = require("./utils/database");
const cors = require("cors");
const bodyParser = require('body-parser');
const session = require('express-session');
const authRouter = require('./utils/auth');

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));

app.use('/login', authRouter);

app.listen(9992, function check(err) {
  if (err) console.log("error");
  else console.log("started");
});


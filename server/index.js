const express = require("express");
const app = express();
const router = express.Router();
const db = require("./utils/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());

const session = require('express-session');

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));

app.listen(9992, function check(err) {
  if (err) console.log("error");
  else console.log("started");
});




app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(`Received email: ${email} and Password: ${password}`);

  // Check if email and password are provided
  if (email == '' || password == '') {
    return res.status(400).json({ message: "Please provide email and password" });
  }else{
    const query = `SELECT * FROM user WHERE email = '${email}'`;

  db.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error querying MySQL database: ' + error.stack);
      return;
    }
    else{
        console.log("ok");
    } 

    // Check if the password matches for any of the returned records
    for (let i = 0; i < results.length; i++) {
      const user = results[i];

      if (user.password === password) {
        // Password matches for this user, set the session variables and redirect to the dashboard
        req.session.isLoggedIn = true;

        req.session.user = {
          id: user.id,
          email: user.email,
          name: user.username
        };

        res.json({message:`Hello, ${user.username}! Welcome to our chat app.`});

        return;
      }
    }

    // Password did not match for any record, return an error
    res.status(401).send('Invalid email or password.');
  });
  }

  
});


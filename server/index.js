const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydatabase",
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + db.threadId);
});

// Login route
router.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide email and password" });
    }
  
    // Check if user exists
    db.query("SELECT * FROM users WHERE email = ?", email, (err, results) => {
      if (err) throw err;
  
      if (results.length === 0) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
  
      // Compare passwords
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (err) throw err;
  
        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid credentials" });
        }
  
        // Create a JWT token
        const payload = { user: { id: results[0].id } };
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      });
    });
  });
  
  module.exports = router;
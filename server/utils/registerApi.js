const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require("./database");




router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(`Received email: ${email} and Password: ${password} and name: ${username}`);
    const existingUserQuery = `SELECT * FROM user WHERE email = '${email}'`;
    db.query(existingUserQuery, async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (result.length > 0) {
        return res.status(400).json({ message: 'Email already registered' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUserQuery = `INSERT INTO user (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`;
      db.query(newUserQuery, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

 

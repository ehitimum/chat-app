const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chat",
  });
  
  // Connect to MySQL database
  db.connect((err) => {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + db.threadId);
  });

  module.exports = db.connection;
  
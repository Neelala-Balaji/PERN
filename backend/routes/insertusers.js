// routes/users.js
const express = require("express");
const router = express.Router();
const createDBPool = require("../dbconn");

// Create a database pool using the function
const dbPool = createDBPool();

// Define route handler for /users
router.post("/", (req, res) => {
  // Implement your logic to fetch users from the database or any other data source
  const { username, email, password } = req.body;
  // Perform the insert query
  try {
    dbPool.query(
      "INSERT INTO user_registration (username, email, password) VALUES ($1, $2, $3)",
      [username, email, password],
      (err, result) => {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).json({ error: "Error executing query" });
        } else {
          res.json({ message: "User inserted successfully" });
        }
      }
    );
  } catch (e) {
    console.error("Error executing query:", e);
  }
});

module.exports = router;

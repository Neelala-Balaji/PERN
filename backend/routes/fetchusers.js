// routes/users.js
const express = require("express");
const router = express.Router();

const createDBPool = require("../dbconn");

// Create a database pool using the function
const dbPool = createDBPool();
const authenticateToken = require("../authenticateToken"); // Import the middleware

// Define route handler for /users
router.get("/", authenticateToken, (req, res) => {
  // Implement your logic to fetch users from the database or any other data source
  const { username } = req.user;
  if (username) {
    try {
      dbPool.query("SELECT * FROM user_registration ", (err, result) => {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).json({ error: "Error executing query" });
        } else {
          res.json(result.rows);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }
});

module.exports = router;

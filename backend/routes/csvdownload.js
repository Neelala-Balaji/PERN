// routes/users.js
const express = require("express");
const router = express.Router();

const createDBPool = require("../dbconn");

// Create a database pool using the function
const dbPool = createDBPool();

// Define route handler for /users
router.get("/", (req, res) => {
  // Implement your logic to fetch users from the database or any other data source

  dbPool.query("SELECT * FROM states ", (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Error executing query" });
    } else {
      res.json(result.rows);
    }
  });
});

module.exports = router;

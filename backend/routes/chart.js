// routes/users.js
const express = require("express");
const router = express.Router();

const createDBPool = require("../dbconn");

// Create a database pool using the function
const dbPool = createDBPool();

// Define route handler for /states
router.get("/", (req, res) => {
  const query = `SELECT * FROM states`;

  try {
    dbPool.query(query, (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Error executing query" });
      }
      res.json(result.rows);
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

module.exports = router;

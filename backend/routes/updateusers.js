// routes/users.js
const express = require("express");
const router = express.Router();
const createDBPool = require("../dbconn");

// Create a database pool using the function
const dbPool = createDBPool();

// Define route handler for /users
router.post("/", (req, res) => {
  // Implement your logic to fetch users from the database or any other data source
  const { username, email, password, id } = req.body;

  const updateQuery = `
  UPDATE user_registration
  SET
    username = $1,
    email = $2,
    password = $3
  WHERE id = $4`;

  const values = [username, email, password, id];

  // Perform the insert query
  try {
    dbPool.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Error executing query" });
      } else {
        res.json({ message: "User updated successfully" });
      }
    });
  } catch (e) {
    console.error("Error executing query:", e);
  }
});

module.exports = router;

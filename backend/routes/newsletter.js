// routes/users.js
const express = require("express");
const router = express.Router();
const createDBPool = require("../dbconn");
const sendEmail = require("../nodemailconn");

// Create a database pool using the function
const dbPool = createDBPool();

// Define route handler for /users
router.post("/", (req, res) => {
  // Implement your logic to fetch users from the database or any other data source
  const { email } = req.body;
  console.log("req", req);

  // Perform the insert query
  try {
    dbPool.query(
      "INSERT INTO user_newsletter (email) VALUES ($1)",
      [email],
      (err, result) => {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).json({ error: "Error executing query" });
        } else {
          res.json({ message: "News letter subscribed successfully" });

          //Send an email
          sendEmail(
            email,
            "News letter subscription",
            "This is a news letter confirmation email from Node.js with postgress"
          );
        }
      }
    );
  } catch (e) {
    console.error("Error executing query:", e);
  }
});

module.exports = router;

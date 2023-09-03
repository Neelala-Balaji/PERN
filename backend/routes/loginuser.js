// routes/users.js
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const createDBPool = require("../dbconn");
const jwtConfig = require("../jwtconfig");

// Create a database pool using the function
const dbPool = createDBPool();

// Define route handler for /api/users
router.post("/", (req, res) => {
  const { email, password } = req.body;

  try {
    // Execute the SQL query
    const query = "SELECT * FROM user_registration WHERE email = $1";

    dbPool.query(query, [email], (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        if (result.rows.length === 0) {
          // User with the provided email not found
          callback(null, null);
        } else {
          const rows = result.rows[0];
          const hashedPassword = rows.password;
          const passwordMatch = password === hashedPassword;
          if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
          }

          const token = jwt.sign({ username: email }, jwtConfig.secretKey, {
            expiresIn: jwtConfig.expiresIn,
          });

          res.json({ token, email: rows.email, username: rows.username });
        }
      }
    });
  } catch (e) {
    console.error("Error executing query:", e);
  }
});

module.exports = router;

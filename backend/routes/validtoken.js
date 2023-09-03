// routes/users.js
const express = require("express");
const router = express.Router();
const authenticateToken = require("../authenticateToken"); // Import the middleware

// Apply the middleware to routes that require authentication
router.get("/", authenticateToken, (req, res) => {
  // Your protected route logic here
  res.json({ message: "Authenticated route", user: req.user });
});

module.exports = router;

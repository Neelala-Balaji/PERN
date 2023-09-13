// routes/users.js
const translate = require("google-translate-api");
const express = require("express");
const router = express.Router();
const authenticateToken = require("../authenticateToken"); // Import the middleware

// Define route handler for /transaltion
router.post("/", authenticateToken, (req, res) => {
  const text = req.body.text;

  try {
    translate(text, { to: "en" })
      .then((res) => {
        console.log(res.text);
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

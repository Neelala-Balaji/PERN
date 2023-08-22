// routes/users.js
const express = require("express");
const multer = require("multer");
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename files
  },
});

const upload = multer({ storage });

// Define route handler for /api/upload
router.post("/", upload.single("file"), (req, res) => {
  // API endpoint for file upload
  res.json({ message: "File uploaded successfully" });
});

module.exports = router;

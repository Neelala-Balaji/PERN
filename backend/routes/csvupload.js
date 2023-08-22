// routes/users.js
const express = require("express");
const multer = require("multer");
const csvParser = require("csv-parser");
const router = express.Router();
const createDBPool = require("../dbconn");

// Create a database pool using the function
const dbPool = createDBPool();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define route handler for /api/csvupload
router.post("/", upload.single("csv"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const fileData = req.file.buffer.toString("utf8");
  const results = [];

  csvParser({ mapHeaders: ({ header }) => header.trim() }) // Skip CSV header and trim header names
    .on("data", (data) => {
      // Process raw CSV row data here
      results.push(data);
    })
    .on("end", async () => {
      try {
        await dbPool.query("BEGIN");
        await Promise.all(
          results.map(async (row) => {
            const query = `
            INSERT INTO states (state_code, state_name, district_code, district_name)
            VALUES ($1, $2, $3, $4)`;
            const values = [
              row.state_code,
              row.state_name,
              row.district_code,
              row.district_name,
            ]; // Adjust as needed

            await dbPool.query(query, values);
          })
        );
        await dbPool.query("COMMIT");
        res.status(200).send("Data uploaded successfully.");
      } catch (error) {
        await dbPool.query("ROLLBACK");
        res.status(500).send("Error uploading data.");
      } finally {
        // dbPool.release();
      }
    })
    .end(fileData);
});

module.exports = router;

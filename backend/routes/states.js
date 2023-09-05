// routes/users.js
const express = require("express");
const router = express.Router();

const createDBPool = require("../dbconn");

// Create a database pool using the function
const dbPool = createDBPool();

// Define route handler for /states
router.post("/", (req, res) => {
  // Implement your logic to fetch states from the database or any other data source
  const { pageSize, page } = req.body;

  const query = `
  SELECT * FROM states
  ORDER BY id
  LIMIT $1 OFFSET $2
`;

  const totalRowCountQuery = `
  SELECT COUNT(*) AS total_records
  FROM states;
`;

  const offset = page > 0 ? (page - 1) * pageSize : page * pageSize;

  const values = [pageSize, offset];

  try {
    dbPool.query(query, values, (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Error executing query" });
      }
      const columns = result.rows;

      dbPool.query(totalRowCountQuery, (error, countResult) => {
        if (error) {
          console.error("Error fetching total row count:", error);
          return;
        }

        const totalRecords = countResult.rows[0].total_records;

        const finalresult = {
          columns: columns,
          totalRecords: totalRecords,
        };

        console.log("finalresult:", finalresult);

        res.json(finalresult);
      });
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

module.exports = router;

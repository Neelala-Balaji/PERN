// routes/users.js
const express = require("express");
const router = express.Router();
const createDBPool = require("../dbconn");

// Create a database pool using the function
const dbPool = createDBPool();

// DELETE /api/deleteusers/:id
router.delete("/:id", async (req, res) => {
  const idToDelete = req.params.id;

  try {
    const result = await dbPool.query(
      "DELETE FROM user_registration WHERE id = $1",
      [idToDelete]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

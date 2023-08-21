const { Pool } = require("pg");

// PostgreSQL configuration
function createDBPool() {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "firstnodeapp",
    password: "postgress@123",
    port: 5432, // Default PostgreSQL port
  });

  // Test the database connection
  pool.connect((err, client, done) => {
    if (err) {
      console.error("Error connecting to the database:", err);
    } else {
      console.log("Connected to PostgreSQL database!");
      done();
    }
  });

  return pool;
}

module.exports = createDBPool;

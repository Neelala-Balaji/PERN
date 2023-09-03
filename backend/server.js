const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 5000; // Set your desired port number

// PostgreSQL configuration
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

// Middleware
app.use(cors());
app.use(express.json());

const usersRoute = require("./routes/fetchusers");
const postsRoute = require("./routes/insertusers");
const updateRoute = require("./routes/updateusers");
const deleteteRoute = require("./routes/deleteusers");
const sendNewsletterRoute = require("./routes/newsletter");
const fileUploadRoute = require("./routes/fileupload");
const csvUploadRoute = require("./routes/csvupload");
const csvDownloadRoute = require("./routes/csvdownload");
const stateRoute = require("./routes/states");
const loginRoute = require("./routes/loginuser");
const protectedRoute = require("./routes/validtoken");

// Use the route handlers for the respective routes
app.use("/api/insertusers", postsRoute);

app.use("/api/getusers", usersRoute);

app.use("/api/updateusers", updateRoute);

app.use("/api/deleteusers", deleteteRoute);

app.use("/api/newsletter", sendNewsletterRoute);

app.use("/api/fileUpload", fileUploadRoute);

app.use("/api/csvupload", csvUploadRoute);

app.use("/api/csvdownload", csvDownloadRoute);

app.use("/api/states", stateRoute);

app.use("/api/login", loginRoute);

app.use("/api/protected", protectedRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

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

// Allow requests only from a specific origin
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Middleware
app.use(cors(corsOptions));
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
const chartData = require("./routes/chart");
const translateData = require("./routes/translate");

// Use the route handlers for the respective routes
app.use("/insertusers", postsRoute);

app.use("/getusers", usersRoute);

app.use("/updateusers", updateRoute);

app.use("/deleteusers", deleteteRoute);

app.use("/newsletter", sendNewsletterRoute);

app.use("/fileUpload", fileUploadRoute);

app.use("/csvupload", csvUploadRoute);

app.use("/csvdownload", csvDownloadRoute);

app.use("/states", stateRoute);

app.use("/login", loginRoute);

app.use("/protected", protectedRoute);

app.use("/chartdata", chartData);

app.use("/translate", translateData);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

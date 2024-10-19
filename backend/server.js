const express = require("express");
const app = express();
require("dotenv").config();
const connectDb = require("./db");
const port = process.env.port || 5000;
const cors = require("cors");
const bodyparser = require("body-parser");
connectDb();

// Enable pre-flight requests for all routes
app.options("*", cors());

app.use(bodyparser.json({ limit: "500mb" }));

// Enable CORS for all routes
app.use(cors({ origin: true, credentials: true }));

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World");
});

const taskRoute = require("./routes/taskRoutes");

app.use("/api/task", taskRoute);

// Start the server
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Open in browser: http://localhost:${port}/`);
});

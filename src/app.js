const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

/**
 * All Router
 *
 * */
const authRoute = require("./routes/authRoute");
app.use("/api/v1/auth", authRoute);

/**
 * All Router
 *
 * */
app.get("/", async (req, res, next) => {
  console.log("Job Hunter server is running".yellow.bold);
  res.status(200).json({
    message: "welcome to the server",
  });
});

app.use((req, res, next) => {
  next(createError(404, "Routes not found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;

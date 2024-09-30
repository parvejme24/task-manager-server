require('dotenv').config();
const express = require("express");
const router = require("./src/routers/api");
const app = express();
const bodyParser = require("body-parser");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

const mongoose = require("mongoose");

// Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Body Parser Implement
app.use(bodyParser.json());

// request Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3000,
});
app.use(limiter);

// MongoDB Database Connection
const URI = `mongodb+srv://mdparvej:${process.env.DB_PASS}@cluster0.2ceqp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
const OPTION = {
  autoIndex: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(URI, OPTION);
    console.log("DB Connection Success");
  } catch (error) {
    console.log("Connection Error: ", error);
  }
};
connectDB();

// routing Implement
app.use("/api/v1", router);

// undefined Route Implement
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" });
});

module.exports = app;

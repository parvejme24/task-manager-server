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

app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3000,
});
app.use(limiter);

let URI =
  "mongodb://mdparvej:<db_password>@<hostname>/?ssl=true&replicaSet=atlas-eleiub-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
let OPTION = {
  user: "testuser7777",
  pass: "testuser7777",
  autoIndex: true,
};
mongoose.connect(URI, OPTION, (error) => {
  if (error) {
    console.log("Connection Error: ", error);
  } else {
    console.log("Connection Success");
  }
});

app.use("/api/v1", router);

app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" });
});

module.exports = app;

const express = require("express");
const cors = require("cors");
const routes = require("../routes");
const mongoose = require("mongoose");
const config = require("../config/config")
const bodyParser = require("body-parser")

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

mongoose
  .connect(config.MONGODB_URL)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.log(err);
    console.error("Error connecting to mongo", err.reason);
  });

// v1 api routes
app.use("/demo", routes);

module.exports = app;

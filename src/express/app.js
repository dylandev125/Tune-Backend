const express = require("express");
const cors = require("cors");
const routes = require("../routes");

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
if (process.env.NODE_ENV == 'production') {
  app.use(cors({ origin: "https://asdf.com/" }));
} else {
  app.use(cors({ origin: "*" }));
}

// // limit repeated failed requests to auth endpoints
// if (config.env === "production") {
//   app.use("/v1/auth", authLimiter);
// }

// v1 api routes
app.use("/api", routes);

module.exports = app;

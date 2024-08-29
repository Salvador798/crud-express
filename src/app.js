const express = require("express");
const morgan = require("morgan");
const config = require("./config");
const clients = require("./modules/clients/route");
const users = require("./modules/users/route");
const auth = require("./modules/auth/route");
const error = require("./red/errors");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config
app.set("port", config.app.port);

// routes
app.use("/api/clients", clients);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

module.exports = app;

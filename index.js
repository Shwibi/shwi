/**
 * Entry point
 * Copyright 2021 Shwibi
 */
global.__source = __dirname;
require("module-alias/register");
const express = require("express");
const fs = require("fs");
const colors = require("colors");
const utils = require("./utils");
const packet = require("./package.json");
require("dotenv").config();

// Create app
const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Home route
app.use("/", require("./routes/home"));

// API route
app.use("/api", require("./routes/api"));

// 404 model
app.get("*", (req, res, next) => {
	res.status(404);
	res.render("pages/404", { path: req.path });
});

// Listen to ip/port
app.listen(process.env.PORT || 7875, (err) => {
	if (err) utils.log(`[Error/Listening to port] `.red + err);
});
utils.log(
	`[Server Started] `.green +
		`Listening at ${process.env.IP}:${process.env.PORT}`
);
module.exports = { packet };

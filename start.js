var express = require("express");
var path = require("path");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Root route
var indexRouter = require("./routes/index");
app.use("/", indexRouter);

app.listen(3000);
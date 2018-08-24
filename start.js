var express = require("express");
var app = express();

var path = require("path");

// enable static http serving
app.use(express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Root route
var indexRouter = require("./routes/index");
app.use("/", indexRouter);

// OAuth route
var authRouter = require("./routes/oauth");
app.use("/oauth", authRouter);

// Upload sample route
var sampleRouter = require("./routes/sample");
app.use("/sample", sampleRouter);

app.listen(3000);
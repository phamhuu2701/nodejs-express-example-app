const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./src/routes/index");
const dbRouter = require("./src/routes/db");
const citiesRouter = require("./src/routes/cities");
const usersRouter = require("./src/routes/users");
const postsRouter = require("./src/routes/posts");
const messagesRouter = require("./src/routes/messages");
const conversationsRouter = require("./src/routes/conversations");

const app = express();

// connect mongodb
const CONFIG = require("./src/config");
const mongodb = require("./src/connector/mongo");
mongodb.connect(CONFIG.MONGO_URL);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/db", dbRouter);
app.use("/api/cities", citiesRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/conversations", conversationsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

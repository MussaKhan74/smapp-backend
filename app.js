var express = require("express");
var dotenv = require("dotenv").config();
var path = require("path");
var cors = require("cors");
var logger = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");

var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(helmet());
app.use(express.json());

// DB CONNECTION
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB CONNECTED"))
  .catch((error) => console.log("Error: " + error));

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});

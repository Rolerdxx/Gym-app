const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const LoginRouter = require("./Routes/LoginRouter");
const MembersRouter = require("./Routes/MembersRouter");
const ContractRouter = require("./Routes/ContractRouter");
const ReportRouter = require("./Routes/ReportRouter");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(morgan("dev"));
// serve up production assets
app.use(express.static("client/build"));
//app.use(express.static("public"));
// app.use(errorHandler);

app.use("/login", LoginRouter);
app.use("/members", MembersRouter);
app.use("/contract", ContractRouter);
app.use("/report", ReportRouter);

// let the react app to handle any unknown routes
// serve up the index.html if express does'nt recognize the route
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

module.exports = app;

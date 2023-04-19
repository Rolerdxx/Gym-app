const express = require("express");
const {getLast12Reports} = require("../Controllers/ReportController");


const ReportRouter = express.Router();

ReportRouter.get("/", getLast12Reports);


module.exports=ReportRouter;
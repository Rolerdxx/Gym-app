const express = require("express");
const {LoginCheck,LoginAdd} = require("../Controllers/LoginController");


const LoginRouter = express.Router();


LoginRouter.post("/logincheck",LoginCheck);
LoginRouter.post("/loginadd",LoginAdd);




module.exports = LoginRouter;
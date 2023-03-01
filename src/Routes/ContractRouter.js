const express = require("express");
const { getContract,putContract } = require("../Controllers/ContractController");



const ContractRouter = express.Router();

ContractRouter.get("/getcontract/:id",getContract);
ContractRouter.put("/updatecontract/:id",putContract);


module.exports = ContractRouter;
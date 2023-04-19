const express = require("express");
const { getMembers,addMember,deleteMember,getActiveMembers,getGenders,getAgeCategories } = require("../Controllers/MembersController");


const MembersRouter = express.Router();


MembersRouter.get("/Members",getMembers);
MembersRouter.post("/addMember",addMember);
MembersRouter.delete("/deleteMember/:id",deleteMember);
MembersRouter.get("/actives",getActiveMembers);
MembersRouter.get("/genders",getGenders);
MembersRouter.get("/getagecategories",getAgeCategories);



module.exports = MembersRouter;
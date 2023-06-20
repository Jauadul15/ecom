const express=require("express");
const router=express.Router();
//middleware
const {requireSignIn,isAdmin}=require("../middlewares/auth")
//controller
const {}=require("../controllers/categories")


module.exports=router;

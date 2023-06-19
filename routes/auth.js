const express=require("express");
const {createProfile,userLogin,UpdateUser}=require("../controllers/userController")
const {requireSignIn,isAdmin}=require("../middlewares/auth")
const router=express.Router();


router.post("/register",createProfile)
router.post("/login",userLogin)
router.put("/profile",requireSignIn,UpdateUser)






module.exports=router;

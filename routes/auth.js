const express=require("express");
const {
    createProfile,
    userLogin,
    UpdateUser,
    profileDetails
}=require("../controllers/userController")
const {requireSignIn,isAdmin}=require("../middlewares/auth")
const router=express.Router();


router.post("/register",createProfile)
router.post("/login",userLogin)
router.put("/profileUpdate",requireSignIn,UpdateUser)
router.get("/profileDetails",requireSignIn,profileDetails)





module.exports=router;

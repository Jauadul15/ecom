const jwt=require("jsonwebtoken");
const User=require("../models/user");

exports.requireSignIn=(req,res,next)=>{
    try{
        const decoded=jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRETKEY
        );
        req.user=decoded;
        next()
    }catch(error) {
        return res.status(401).json({
            status:"Fail",
            message:(error)
        });
    }
}


exports.isAdmin=async (req,res,next)=>{
    try {
        const user=await User.findById(req.user._id);
        if(user.Role !==admin){
            return res.status(401).json({
                status:"Fail",
                message:"Unauthorized"
            })
        }
        else{
            next();
        }
    }catch(error){
        res.json(error);
    }
}
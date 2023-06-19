const User=require("../models/user");
const {comparePassword,hashPassword}=require("../helpers/auth");
const jwt=require("jsonwebtoken");
require("dotenv").config();


exports.createProfile=async (req,res)=>{
    try {
        const {
            firstname,
            lastname,
            email,
            username,
            password,
            passwordConfirm,
            mobileNumber,
            role,
        }=req.body;
        //custom validation check for each Field
        if(!firstname || !lastname){
            return res.status(400).json({
                status:"Fail",
                message:"FirstName and LastName required"
            });
        }
        if(!email){
            return res.status(400).json({
                status:"Fail",
                message:"Email Address is Required"
            });
        }
        if(!username){
            return res.status(400).json({
                status:"Fail",
                message:"UserName is required"
            });
        }
        if(!password){
            return res.status(400).json({
                status:"Fail",
                message:"Password is Required"
            });
        }
        // Regular expression for Bangladeshi mobile number format (e.g., +8801712345678 or 01712345678)
        const mobileNumberRegex= /^(?:\+?88)?01[3-9]\d{8}$/;
            ///^(?:\+88|01)?(?:\d{11}|\d{13})$/;
        if(!mobileNumberRegex.test(mobileNumber)){
            return res.status(400).json({
                status:"Fail",
                message:"Please Provide a Valid Number"
            });
        }
        if(password !==passwordConfirm){
            return res.status(400).json({
                status:"Fail",
                message:"Password Not Matching"
            });
        }
        //check if email is taken
        const existingUser=await User.findOne({email,username,mobileNumber });
        if(existingUser){
            return res.status(400).json({
                status:"Fail",
                message:"Please Enter valid User Information.A User Exists by this Information"
            });
        }
        //Password Hashing Applying in database it will store hashed which user enter a plain password it will turn into hashed and saved the hashed password in database
        const hashedPassword=await hashPassword(password)

        //Register User
        const user=await User.create({
            firstname,
            lastname,
            email,
            username,
            password:hashedPassword,
            mobileNumber,
            role
        });
        const token=jwt.sign({_id:User._id},process.env.JWT_SECRETKEY,{
            expiresIn: "7d"
        });
        res.status(201).json({
            status:"User Created Successfully",
            data:user,
            token,
        });
    }catch (error) {
        console.error(error);
        res.status(500).json({
            status:"Something Went Wrong",
            message:"User Not Created For some Internal Issue"
        })
    }
}
exports.userLogin = async (req, res) => {
    try {
        // 1. destructure username, email, password from req.body
        const { mobileNumber, email, password } = req.body;

        // 2. all fields require validation
        if (!mobileNumber) {
            return res.json({ error: "Mobile Number is required" });
        }

        if (!email) {
            return res.json({ error: "Email is required" });
        }

        if (!password) {
            return res.json({ error: "Please provide your correct password to login" });
        }

        // 3. check if user exists by email or username
        const user = await User.findOne({ $or: [{ email }, { mobileNumber }] })

        if (!user) {
            return res.json({ error: "User not found" });
        }

        // 4. compare password
        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.json({ error: "Invalid email or password" });
        }

        // 5. create signed jwt
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRETKEY, {
            expiresIn: "7d",
        });

        // 6. send response
        res.json({
            user: {
                _id: user._id,
                UserName: user.UserName,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "An error occurred while logging in.",
        });
    }
};


exports.UpdateUser=async (req,res)=>{
    try {
        const {mobileNumber,password}=req.body
        const user=await User.findById(req.user._id);
        console.log(user);

        if(!password){
            return res.json({
                error:"Password is required"
            })
        }
        const hashedPassword=password ? await hashPassword(password):undefined;
        const updated=await User.findByIdAndUpdate(
            req.user._id,
            {
                mobileNumber:mobileNumber||user.mobileNumber,
                password:hashedPassword|| user.password,
        },
            { new:true }
        );
        updated.password=undefined;
        res.json(updated);

    }catch(error) {
        console.log(error);
    }
}

exports.profileDetails=async (req,res)=>{
    try {

    }catch(error) {

    }
}
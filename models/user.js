const mongoose=require("mongoose");
const {Schema}=mongoose;


const userSchema=new Schema({
    firstname:{
        type:String,
        required:[true,"First Name is Required"],
        trim:true,
        minLength:[2,"First name should be at least 2 characters"],
        maxLength:[50,"First name should not be exceed 50 characters"],
    },
    lastname:{
        type:String,
        required:[true,"Last Name is Required"],
        trim:true,
        minLength:[2,"LastName should be at least 2 characters"],
        maxLength: [50,"LastName should not be exceed 50 characters"],
    },
    email:{
        type:String,
        required:[true,"Email Required"],
        unique:true,
        trim:true,
        match:[
            /^\S+@\S+\.\S+$/,
            "Please provide a valid email address.",
        ],
    },
    username:{
        type:String,
        required:[true,"UserName is required"],
        unique: true,
        trim:true,
        minLength:[4,"UserName should have at least 4 characters."],
        maxLength:[20,"Username should not exceed 20 characters."],
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[8,"Password should have at least 8 characters."],

    },
    passwordConfirm: {
        type: String,
        validate: {
            validator: function (value) {
                return value === this.Password;
            },
            message: "Passwords do not match",
        },
    },
    mobileNumber:{
        type:String,
        trim:true,
        unique:true,
    },
    role: {
        type: String,
        enum: ["admin", "general user", "manager", "supervisor", "employee", "guest"],
        default: "general user",
    }

},{
    timestamps:true,
    versionKey:false,
    autoIndex:true
});

const UserModel=mongoose.model("User",userSchema);
module.exports=UserModel;
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { stringify } = require("uuid");
 
const studentModel = new mongoose.Schema({

    email:{
        type:String,
        required:[true,"Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true,
    },
    password:{
        type:String,
        select:false,
        maxLength:[15, "Password should not be exceed more than 15 characters"],
        minLength:[6, "Password should have atleast 6 characters"],
        // match:[]
    },
    resetPasswordToken : {
      type:String,
      default:"0"

    }
}, {timestamps:true})

studentModel.pre("save", function(){

    if(!this.isModified("password")){
        return;
    }

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

studentModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

// for generating token
studentModel.methods.getjwttoken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET , {expiresIn:process.env.JWT_EXPIRE})
} //.sign mean create jwt token

const Student = mongoose.model("student", studentModel)

module.exports = Student;
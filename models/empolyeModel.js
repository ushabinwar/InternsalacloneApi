const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { stringify } = require("uuid");
 
const employeModel = new mongoose.Schema({
    firstname : {
        type:String,
        required:[true,"First Name is required"],
        minLength: [4, "First Name should be atleast 4 charachter long"]
    },
    lastname : {
        type:String,
        required:[true,"Last Name is required"],
        minLength: [4, "Last Name should be atleast 4 charachter long"]
    },
    contact:{
        type:String,
        required:[true,"Last Name is required"],
        maxLength:[10,"Contact must have 10 characters"],
        minLength: [10, "Contact should be atleast 10 charachter long"]
    },

    organizationname : {
        type:String,
        required:[true,"Organization Name is required"],
        minLength: [4, "Organization Name should be atleast 4 charachter long"]
    },
    
    organizationlogo:{
        type:Object,
        default:{
            fileId:"",
            url:"https://images.unsplash.com/photo-1721068685423-7b2512ef2e28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
        }
    },
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

    },
    internships:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"internship"
        }
    ],
    jobs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"job"
        }
    ]
}, {timestamps:true})

employeModel.pre("save", function(){

    if(!this.isModified("password")){
        return;
    }

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

employeModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

// for generating token
employeModel.methods.getjwttoken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET , {expiresIn:process.env.JWT_EXPIRE})
} //.sign mean create jwt token

const Employe = mongoose.model("employe", employeModel)

module.exports = Employe;
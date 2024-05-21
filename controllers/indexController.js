const { Error } = require("mongoose")
const {catchAsyncError} = require("../middlewares/catchAsyncError")
const Student =  require("../models/studentModel")
const ErrorHndler = require("../utils/ErrorHanler")

exports.homepage = catchAsyncError(async (req, res, next)=>{
        res.json({message:"homepage"})
})


exports.studentsignup = catchAsyncError(async (req, res, next)=>{
        const student = await new Student(req.body).save();
        res.status(201).json(student)
})

exports.studentsignin = catchAsyncError(async (req, res, next)=>{
       const student = await Student.findOne({email:req.body.email}).select("+password").exec();
     
       if(!student)
        return next( new ErrorHndler("User not found with this email address", 404))

        const isMatch = student.comparepassword(req.body.password);
        if(!isMatch) return next (new ErrorHndler ("Wrong Credential", 500));

        res.json(student)
       
})

exports.studentsignout = catchAsyncError(async (req, res, next)=>{
        
})

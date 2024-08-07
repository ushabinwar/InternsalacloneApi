const { Error } = require("mongoose")
const {catchAsyncError} = require("../middlewares/catchAsyncError")
const Student =  require("../models/studentModel")
const Internship =  require("../models/internshipModel")
const Job =  require("../models/jobModel")
const ErrorHndler = require("../utils/ErrorHandler")
const { sendtoken } = require("../utils/SendToken")
const { sendmail } = require("../utils/nodemailer")
const path = require("path")
const imagekit = require("../utils/imagekit").initimagekit()

exports.homepage = catchAsyncError(async (req, res, next)=>{
        res.json({message:"Secure Homepage!"})
})

exports.currentUser = catchAsyncError(async (req, res, next)=>{
        const student = await Student.findById(req.id).exec();
        // console.log(student)

        res.json({student})
})

exports.studentsignup = catchAsyncError(async (req, res, next)=>{
        const student = await new Student(req.body).save();
        // res.status(201).json(student)
        sendtoken(student , 201, res) 
})

exports.studentsignin = catchAsyncError(async (req, res, next)=>{
       const student = await Student.findOne({email:req.body.email}).select("+password").exec();
     
       if(!student)
        return next( new ErrorHndler("User not found with this email address", 404))

        const isMatch = student.comparepassword(req.body.password);
        if(!isMatch) return next (new ErrorHndler ("Wrong Credential", 500));

        // res.json(student)
        sendtoken(student , 200, res)
       
})

exports.studentsignout = catchAsyncError(async (req, res, next)=>{
        res.clearCookie("token")
        res.json({message:"Successfully signout!"})
})

exports.studentsendmail = catchAsyncError(async (req, res, next)=>{
        const student = await Student.findOne({email:req.body.email}).exec();

        if(!student)
        return next( new ErrorHndler("User not found with this email address", 404))

        const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`; 
        sendmail(req,res,next,url)
        student.resetPasswordToken = "1"
        await student.save()

        res.json({student, url})

})

exports.studentforgetlink = catchAsyncError(async (req, res, next)=>{
        const student = await Student.findById(req.params.id).exec();

        if(!student)
        return next( new ErrorHndler("User not found with this email address", 404))

        if(student.resetPasswordToken =="1"){
                student.resetPasswordToken = "0";
                student.password = req.body.password
                await student.save()
        }else{
                return next( new ErrorHndler("Invalid Reset Password Link! Please Try Again", 404))

        }
      
       res.status(200).json({message :"Pasword has been changed sucessfully"})
})


exports.studentresetpassword = catchAsyncError(async (req, res, next)=>{
       const student = await Student.findById(req.id).exec();
       student.password = req.body.password
       await student.save()
       sendtoken(student , 200, res)
       
      
       res.status(200).json({message :"Pasword has been Reset sucessfully"})
})

exports.studentupdate = catchAsyncError(async (req, res, next)=>{
        const student = await Student.findByIdAndUpdate(req.params.id, req.body).exec();
        res.status(200).json({
                success:true,
                message:"Student Updated Sucessfully",
                student
        })
        
})

exports.studentavatar = catchAsyncError(async (req, res, next)=>{
        const student = await Student.findById(req.params.id).exec();
        const file = req.files.avatar
        const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`

        if(student.avatar.fileId !== ""){
                await imagekit.deleteFile(student.avatar.fileId)
        }
        
        // uploading file
        const {fileId , url} = await imagekit.upload({
                file:file.data,
                fileName : modifiedFileName
        })
        student.avatar ={fileId , url}
        await student.save()
        res.status(200).json({
                success:true,
                message:"Profile Uploded Sucessfully",
           
        })
})


//------------------apply internship---------------

exports.applyinternship = catchAsyncError(async (req, res, next)=>{
        const student = await Student.findById(req.id).exec();
        
        const internship = await Internship.findById(req.params.internshipid).exec()
        // if (!student) {
        //         return res.status(404).json({ message: 'Student not found' });
        //     }
        
        //     if (!internship) {
        //         return res.status(404).json({ message: 'Internship not found' });
        //     }
        student.internships.push(internship._id)
        internship.students.push(student._id)
        await student.save();
        await internship.save()

        res.json({student, internship})
})

//------------------apply job---------------

exports.applyjob = catchAsyncError(async (req, res, next)=>{
        const student = await Student.findById(req.id).exec();
        
        const job = await Job.findById(req.params.jobid).exec()
        // if (!student) {
        //         return res.status(404).json({ message: 'Student not found' });
        //     }
        
        //     if (!job) {
        //         return res.status(404).json({ message: 'job not found' });
        //     }
        student.jobs.push(job._id)
        job.students.push(student._id)
        await student.save();
        await job.save()

        res.json({student, job})
})


//==============delete student ===================

exports.deletestudent = catchAsyncError(async (req, res, next)=>{
        const student = await Student.findByIdAndDelete(req.params.id).exec();

        res.json({success:true, message:"Student Deleted Sucessfully! "})
})



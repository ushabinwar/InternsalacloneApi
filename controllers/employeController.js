const { Error } = require("mongoose")
const {catchAsyncError} = require("../middlewares/catchAsyncError")
const Employe =  require("../models/empolyeModel")
const Internship =  require("../models/internshipModel")
const Job=  require("../models/jobModel")
const ErrorHndler = require("../utils/ErrorHandler")
const { sendtoken } = require("../utils/SendToken")
const { sendmail } = require("../utils/nodemailer")
const path = require("path")
const imagekit = require("../utils/imagekit").initimagekit()

exports.homepage = catchAsyncError(async (req, res, next)=>{
        res.json({message:"Secure Employe Homepage!"})

})

exports.currentEmploye = catchAsyncError(async (req, res, next)=>{
        const employe = await Employe.findById(req.id).exec();

        res.json({employe})
})

exports.employesignup = catchAsyncError(async (req, res, next)=>{
        const employe = await new Employe(req.body).save();
        // res.status(201).json(employe)
        sendtoken(employe , 201, res)
        // console.log(employe)
})
exports.employesignin = catchAsyncError(async (req, res, next)=>{
        const employe = await Employe.findOne({email:req.body.email}).select("+password").exec();
      
        if(!employe)
         return next( new ErrorHndler("User not found with this email address", 404))
 
         const isMatch = employe.comparepassword(req.body.password);
         if(!isMatch) return next (new ErrorHndler ("Wrong Credential", 500));
 
        //  res.json(employe)
         sendtoken(employe, 200, res)
        
 })


exports.employesignout = catchAsyncError(async (req, res, next)=>{
        res.clearCookie("token")
        res.json({message:"Employe Successfully signout!"})
})

exports.employesendmail = catchAsyncError(async (req, res, next)=>{
        const employe = await Employe.findOne({email:req.body.email}).exec();

        if(!employe)
        return next( new ErrorHndler("User not found with this email address", 404))

        const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${employe._id}`; 
        sendmail(req,res,next,url)
        employe.resetPasswordToken = "1"
        await employe.save()

        res.json({employe, url})

})

exports.employeforgetlink = catchAsyncError(async (req, res, next)=>{
        const employe = await Employe.findById(req.params.id).exec();

        if(!employe)
        return next( new ErrorHndler("User not found with this email address", 404))

        if(employe.resetPasswordToken =="1"){
                employe.resetPasswordToken = "0";
                employe.password = req.body.password
                await employe.save()
        }else{
                return next( new ErrorHndler("Invalid Reset Password Link! Please Try Again", 404))

        }
      
       res.status(200).json({message :"Pasword has been changed sucessfully"})
})


exports.employeresetpassword = catchAsyncError(async (req, res, next)=>{
       const employe = await Employe.findById(req.id).exec();
       employe.password = req.body.password
       await employe.save()
       sendtoken(employe , 200, res)
       
      
       res.status(200).json({message :"Pasword has been Reset sucessfully"})
})

exports.employeupdate = catchAsyncError(async (req, res, next)=>{
        const employe = await Employe.findByIdAndUpdate(req.params.id, req.body).exec();
        res.status(200).json({
                success:true,
                message:"employe Updated Sucessfully",
                // employe
        })
        
})

exports.employeavatar = catchAsyncError(async (req, res, next)=>{
        const employe = await Employe.findById(req.params.id).exec();
        const file = req.files.organizationlogo
        const modifiedFileName = `organizationlogo-${Date.now()}${path.extname(file.name)}`

        if(employe.organizationlogo.fileId !== ""){
                await imagekit.deleteFile(employe.avatar.fileId)
        }
        
        // uploading file
        const {fileId , url} = await imagekit.upload({
                file:file.data,
                fileName : modifiedFileName
        })
        employe.organizationlogo ={fileId , url}
        await employe.save()
        res.status(200).json({
                success:true,
                message:"Profile Uploded Sucessfully",
           
        })
})



//----------------------------internship-------------------

exports.createinternship = catchAsyncError(async (req, res, next)=>{
        const employe = await Employe.findById(req.id).exec();
        const internship = await new Internship(req.body);
        internship.employe = employe._id
        employe.internships.push(internship._id)
        await internship.save()
        await employe.save()
        res.status(201).json({success:"ture", internship})
        
})

exports.readinternship = catchAsyncError(async (req, res, next)=>{
        const {internships} = await Employe.findById(req.id).populate("internships").exec();
        res.status(200).json({success:"ture", internships})
        
})

exports.readsingleinternship = catchAsyncError(async (req, res, next)=>{
        const internship = await Internship.findById(req.params.id);
        res.status(200).json({success:"ture", internship})
        
})


//----------------------------job-------------------

exports.createjob = catchAsyncError(async (req, res, next)=>{
        const employe = await Employe.findById(req.id).exec();
        const job = await new Job(req.body);
        job.employe = employe._id
        employe.jobs.push(job._id)
        await job.save()
        await employe.save()
        res.status(201).json({success:"ture", job})
        
})

exports.readjob = catchAsyncError(async (req, res, next)=>{
        const {jobs} = await Employe.findById(req.id).populate("jobs").exec();
        res.status(200).json({success:"ture", jobs})
        
})

exports.readsinglejob = catchAsyncError(async (req, res, next)=>{
        const job = await Job.findById(req.params.id);
        res.status(200).json({success:"ture", job})
        
})

//---------------------delete employe-----------------

exports.deleteemploye = catchAsyncError(async (req, res, next)=>{
        const employe = await Employe.findByIdAndDelete(req.params.id).exec();

        res.json({success:true, message:"Employe Deleted Sucessfully! "})
})



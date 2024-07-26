const {catchAsyncError} = require("../middlewares/catchAsyncError")
const Student =  require("../models/studentModel")
const ErrorHndler = require("../utils/ErrorHandler")
const { v4: uuidv4 } = require('uuid');


exports.resume = catchAsyncError(async (req, res, next)=>{
    const{ resume }= await Student.findById(req.id).exec();
    // console.log(resume)
    res.json({message:"Secure Resume Page!", resume})
})

//------------------------EDUCATION--------------------------------

exports.addeducation = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({...req.body, id: uuidv4()})
    await student.save()
    res.json({message:"Education added"})
    
})

exports.editeducation = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex((i)=> i.id === req.params.eduid);
    student.resume.education[eduIndex] = { ...student.resume.education[eduIndex],...req.body}
    await student.save() 
    res.json({message:"Education Updated"})
    
})

exports.deleteeducation = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const filterededucation= student.resume.education.filter((i)=> i.id !== req.params.eduid);
    student.resume.education = filterededucation
    await student.save() 
    res.json({message:"Education Deleted"})
    
})


//------------------------JOBS--------------------------------

exports.addjob = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({...req.body, id: uuidv4()})
    await student.save()
    res.json({message:"Job added"})
    
})

exports.editjob = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const jobIndex = student.resume.jobs.findIndex((i)=> i.id === req.params.jobid);
    student.resume.jobs[jobIndex] = { ...student.resume.jobs[jobIndex],...req.body}
    await student.save() 
    res.json({message:"Job Updated"})
   
    
})

exports.deletejob = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredjob= student.resume.jobs.filter((i)=> i.id !== req.params.jobid);
    student.resume.jobs = filteredjob
    await student.save() 
    res.json({message:"Job Deleted", student})
    
})

//------------------------INTERNSHIP--------------------------------

exports.addinternship = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.internships.push({...req.body, id: uuidv4()})
    await student.save()
    res.json({message:"internship added", student})
    
})

exports.editinternship = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const internshipIndex = student.resume.internships.findIndex((i)=> i.id === req.params.internshipid);
    student.resume.internships[internshipIndex] = { ...student.resume.internships[internshipIndex],...req.body}
    await student.save() 
    res.json({message:"internship Updated", student})
   
    
})

exports.deleteinternship = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredinternship= student.resume.internships.filter((i)=> i.id !== req.params.internshipid);
    student.resume.internships = filteredinternship
    await student.save() 
    res.json({message:"internship Deleted", student})
    
})

//------------------------RESPONSBILITIES--------------------------------

exports.addresponsibilities = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.responsibilities.push({...req.body, id: uuidv4()})
    await student.save()
    res.json({message:"responsibilities added", student})
    
})

exports.editresponsibilities = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const responsibilitiesIndex = student.resume.responsibilities.findIndex((i)=> i.id === req.params.responsibilitiesid);
    student.resume.responsibilities[responsibilitiesIndex] = { ...student.resume.responsibilities[responsibilitiesIndex],...req.body}
    await student.save() 
    res.json({message:"responsibilities Updated", student})
   
    
})

exports.deleteresponsibilities = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredresponsibilities= student.resume.responsibilities.filter((i)=> i.id !== req.params.responsibilitiesid);
    student.resume.responsibilities = filteredresponsibilities
    await student.save() 
    res.json({message:"responsibilities Deleted", student})
    
})


//------------------------COURSE--------------------------------

exports.addcourse = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.courses.push({...req.body, id: uuidv4()})
    await student.save()
    res.json({message:"course added", student})
    
})

exports.editcourse = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const courseIndex = student.resume.courses.findIndex((i)=> i.id === req.params.courseid);
    student.resume.courses[courseIndex] = { ...student.resume.courses[courseIndex],...req.body}
    await student.save() 
    res.json({message:"course Updated", student})
   
    
})

exports.deletecourse = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredcourse= student.resume.courses.filter((i)=> i.id !== req.params.courseid);
    student.resume.courses = filteredcourse
    await student.save() 
    res.json({message:"course Deleted", student})
    
})

//------------------------PROJECT--------------------------------

exports.addproject = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({...req.body, id: uuidv4()})
    await student.save()
    res.json({message:"project added", student})
    
})

exports.editproject = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const projectIndex = student.resume.projects.findIndex((i)=> i.id === req.params.projectid);
    student.resume.projects[projectIndex] = { ...student.resume.projects[projectIndex],...req.body}
    await student.save() 
    res.json({message:"project Updated", student})
   
    
})

exports.deleteproject = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredproject= student.resume.projects.filter((i)=> i.id !== req.params.projectid);
    student.resume.projects = filteredproject
    await student.save() 
    res.json({message:"project Deleted", student})
    
})


//------------------------SKILL--------------------------------

exports.addskill = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({...req.body, id: uuidv4()})
    await student.save()
    res.json({message:"skill added", student})
    
})

exports.editskill = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const skillIndex = student.resume.skills.findIndex((i)=> i.id === req.params.skillid);
    student.resume.skills[skillIndex] = { ...student.resume.skills[skillIndex],...req.body}
    await student.save() 
    res.json({message:"skill Updated", student})
   
    
})

exports.deleteskill = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredskill= student.resume.skills.filter((i)=> i.id !== req.params.skillid);
    student.resume.skills = filteredskill
    await student.save() 
    res.json({message:"skill Deleted", student})
    
})


//------------------------ACCOMLISHMENT--------------------------------

exports.addaccomplishment = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({...req.body, id: uuidv4()})
    await student.save()
    res.json({message:"accomplishment added", student})
    
})

exports.editaccomplishment = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const accomplishmentIndex = student.resume.accomplishments.findIndex((i)=> i.id === req.params.accomplishmentid);
    student.resume.accomplishments[accomplishmentIndex] = { ...student.resume.accomplishments[accomplishmentIndex],...req.body}
    await student.save() 
    res.json({message:"accomplishment Updated", student})
   
    
})

exports.deleteaccomplishment = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const filteredaccomplishment= student.resume.accomplishments.filter((i)=> i.id !== req.params.accomplishmentid);
    student.resume.accomplishments = filteredaccomplishment
    await student.save() 
    res.json({message:"accomplishment Deleted", student})
    
})
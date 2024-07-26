const express = require("express")
const router = express.Router()
const { resume, 
    addeducation,
    editeducation,
    deleteeducation,
    addjob,
    editjob,
    deletejob,
    addinternship,
    editinternship,
    deleteinternship,
    addresponsibilities,
    editresponsibilities,
    deleteresponsibilities,
    addcourse,
    editcourse,
    deletecourse,
    addproject,
    editproject,
    deleteproject,
    addskill,
    editskill,
    deleteskill,
    addaccomplishment,
    editaccomplishment,
    deleteaccomplishment
} = require("../controllers/resumeController")
const {isAuthenticated} = require("../middlewares/auth")


//GET
router.get('/', isAuthenticated, resume)

//---------------------------EDUCATION----------------------
//POST /add-edu
router.post("/add-edu", isAuthenticated, addeducation)

//POST /edit-edu/:eduid
router.post("/edit-edu/:eduid", isAuthenticated, editeducation)

//POST /delete-edu/:eduid
router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation)


//---------------------------JOB----------------------

//POST /add-job
router.post("/add-job", isAuthenticated, addjob)

//POST /edit-job/:jobid
router.post("/edit-job/:jobid", isAuthenticated, editjob)

//POST /delete-job/:jobid
router.post("/delete-job/:jobid", isAuthenticated, deletejob)


//---------------------------INTERNSHIP----------------------

//POST /add-internship
router.post("/add-internship", isAuthenticated, addinternship)

//POST /edit-internship/:internshipid
router.post("/edit-internship/:internshipid", isAuthenticated, editinternship)

//POST /delete-internship/:internshipid
router.post("/delete-internship/:internshipid", isAuthenticated, deleteinternship)


//---------------------------RESPONSIBILITIES----------------------

//POST /add-responsibilities
router.post("/add-responsibilities", isAuthenticated, addresponsibilities)

//POST /edit-responsibilities/:responsibilitiesid
router.post("/edit-responsibilities/:responsibilitiesid", isAuthenticated, editresponsibilities)

//POST /delete-responsibilities/:responsibilitiesid
router.post("/delete-responsibilities/:responsibilitiesid", isAuthenticated, deleteresponsibilities)


//-------------------------- COURSE----------------------

//POST /add-course
router.post("/add-course", isAuthenticated, addcourse)

//POST /edit-course/:courseid
router.post("/edit-course/:courseid", isAuthenticated, editcourse)

//POST /delete-course/:courseid
router.post("/delete-course/:courseid", isAuthenticated, deletecourse)

//-------------------------- PROJECT----------------------

//POST /add-project
router.post("/add-project", isAuthenticated, addproject)

//POST /edit-project/:projectid
router.post("/edit-project/:projectid", isAuthenticated, editproject)

//POST /delete-project/:projectid
router.post("/delete-project/:projectid", isAuthenticated, deleteproject)

//-------------------------- SKILL----------------------

//POST /add-skill
router.post("/add-skill", isAuthenticated, addskill)

//POST /edit-skill/:skillid
router.post("/edit-skill/:skillid", isAuthenticated, editskill)

//POST /delete-skill/:skillid
router.post("/delete-skill/:skillid", isAuthenticated, deleteskill)


//--------------------------ACCOMPLISHMENT----------------------

//POST /add-accomplishment
router.post("/add-accomplishment", isAuthenticated, addaccomplishment)

//POST /edit-accomplishment/:accomplishmentid
router.post("/edit-accomplishment/:accomplishmentid", isAuthenticated, editaccomplishment)

//POST /delete-accomplishment/:accomplishmentid
router.post("/delete-accomplishment/:accomplishmentid", isAuthenticated, deleteaccomplishment)

module.exports = router;
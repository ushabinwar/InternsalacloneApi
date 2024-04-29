exports.generatedErrors = (err, req, res, next)=>{
    const statuscode = err.statuscode || 500;

    if(err.name === "MongoServerError" && err.message.includes("E11000 duplicate key")){
        err.message ="Student with this email address already exists"
    }

    res.status(statuscode).json({
        message: err.message,
        errName: err.name,
        // stack:err.stack
    })
}
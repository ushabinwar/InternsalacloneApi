exports.sendtoken = (student , statusCode, res) =>{
    const token = student.getjwttoken();

    const options = {
        expires : new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly:true,
        // secure:true
    }
    res.status(statusCode)
    .cookie("token", token , options)
    .json({sucess:true, id:student._id, token})

    res.json({token})   
}


exports.sendtoken = (employe , statusCode, res) =>{
    const token = employe.getjwttoken();

    const options = {
        expires : new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly:true,
        // secure:true
    }
    res.status(statusCode)
    .cookie("token", token , options)
    .json({sucess:true, id:employe._id, token})

    res.json({token})   
}
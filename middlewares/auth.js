const jwt = require("jsonwebtoken")
const {catchAsyncError} = require("./catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");

exports.isAuthenticated = catchAsyncError(async(req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to access resouces" , 401))
    }

    const {id} = jwt.verify(token, process.env.JWT_SECRET);
    req.id = id
    next();

    // res.json({id, token})
})
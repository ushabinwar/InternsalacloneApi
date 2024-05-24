require("dotenv").config({path:"./.env"})
const express = require("express")
const app = express()

//db connection
const databaseConnection = require("./models/database").connectDatabase()

//logger
const logger = require("morgan")
app.use(logger("tiny"))

//bodyparser = body parser la kaam hota hai req.body ko activate krna or req.body ko activate krne ke liye body parser ko activate krna pdega jo hume milta hai express se
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// session ans cookie
const session = require("express-session");
const cookieparser = require("cookie-parser")
app.use(session({
    resave: true,
    saveUninitialized:true,
    secret:process.env.EXPRESS_SESSION_SECRET,
}))
app.use(cookieparser())// it activate cookie

//routes
app.use("/" , require("./routes/indexRouter"))

//error handling
const ErrorHandler = require("./utils/ErrorHandler")
const {generatedErrors} = require("./middlewares/errors")
const cookieParser = require("cookie-parser")
app.all("*",(req, res, next)=>{
    next(new ErrorHandler(`Requested URL Not Found ${req.url}`, 404))
})
app.use(generatedErrors)

app.listen(process.env.PORT, console.log(`server is running on port ${process.env.PORT}`))
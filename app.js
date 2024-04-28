require("dotenv").config({path:"./.env"})
const express = require("express")
const app = express()

//logger
const logger = require("morgan")
app.use(logger("tiny"))

//routes
app.use("/" , require("./routes/indexRouter"))

//error handling
const ErrorHndler = require("./utils/ErrorHanler")
const {generatedErrors} = require("./middlewares/errors")
app.all("*",(req, res, next)=>{
    next(new ErrorHndler(`Requested URL Not Found ${req.url}`, 404))
})
app.use(generatedErrors)

app.listen(process.env.PORT, console.log(`server is running on port ${process.env.PORT}`))
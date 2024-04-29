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
require("dotenv").config({path:"./.env"})
const express = require("express")
const app = express()

//logger
const logger = require("morgan")
app.use(logger("tiny"))

//routes
app.use("/" , require("./routes/indexRouter"))

app.listen(process.env.PORT, console.log(`server is running on port ${process.env.PORT}`))
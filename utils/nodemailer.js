const nodemailer = require("nodemailer")
const ErrorHndler = require("./ErrorHandler")

exports.sendmail = (req,res,next,url) => {
    const transport = nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        post: 465,
        auth:{
            user: process.env.MAIL_EMAIL_ADDRESS, // jo mail bhej rha hai
            pass: process.env.MAIL_PASSWORD,
        }
    })

    // things that email conatains
    const mailOptions = {
        from:"Usha Private Limited",
        to:req.body.email,
        subject:"Passwor Reset Link",
        "text":"Do not share this link to anyone",
        html:`<h1>Clink link blow to reset password</h1>
              <a href =" ${url}"> Password Reset Link</a>`
    }

    transport.sendMail(mailOptions, (err, info) =>{
        if(err) return next( new ErrorHndler(err, 500))
        console.log(info)
        return res.status(200).json({
            message:"mail sent sucessfully",
            url,
        })

    })
}
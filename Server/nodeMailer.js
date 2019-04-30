const nodemailer = require ('nodemailer')
require('dotenv').config()
const { EMAIL, PASSWORD } = process.env

let treansporter = nodemailer.createTransprt({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
})

let mailOptions = {
  from : 'DentalWebSite',
  to: 'benjamincook1313@gmail.com',
  subject: 'Appointment Request',
  text: 'You have 1 new request to schedule an appontment! '
}

treansporter.sendMail(mailOptions, function(err, data) {
  if(err) {
    console.log('Error sending email')
  }else{
    console.log('Email sent!!!')
  }
})


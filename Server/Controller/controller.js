require('dotenv').config()
const { AUTHTOKEN, ACCOUNTSID, EMAIL, PASSWORD, OFFICE_EMAIL, PHONE_NUMBER } = process.env

const accountSid = ACCOUNTSID
const authToken = AUTHTOKEN
const client = require('twilio')(accountSid, authToken);

const nodemailer = require ('nodemailer')

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
})

let mailOptions = {
  from : EMAIL,
  to: OFFICE_EMAIL,
  subject: 'Appointment Request',
  text: 'You have 1 new request to schedule an appontment!'
}


module.exports = {
  checkForUser: (req, res) => {
    res.status(200).send(req.session.user)
  },

  addAboutPost: async (req, res) => {
    const { title, imageUrl, text } = req.body
    const posts = await req.app.get('db')
    .add_about_post(title, imageUrl, text)
    res.status(200).send(posts)
  },
  getAboutPosts: async(req, res) => {
    const posts = await req.app.get('db')
    .get_about_posts()
    res.status(200).send(posts)
  },
  editAboutPost: async (req, res) => {
    const { title, imageUrl, text } = req.body
    const { id } =req.params
    const updatedPost = await req.app.get('db')
    .update_about_post(id, title, imageUrl, text)
    res.status(200).send(updatedPost)
  },
  deleteAboutPost: async (req, res) => {
    const { id } = req.params
    const posts = await req.app.get('db')
    .delete_about_post(id)
    res.status(200).send(posts)
  },

  getServicesPosts: async(req, res) => {
    const posts = await req.app.get('db')
    .get_services_posts()
    res.status(200).send(posts)
  },
  addServicesPost: async (req, res) => {
    const { title, imageUrl, text } = req.body
    const posts = await req.app.get('db')
    .add_services_post(title, imageUrl, text)
    res.status(200).send(posts)
  },
  editServicesPost: async (req, res) => {
    const { title, imageUrl, text } = req.body
    const { id } = req.params
    const updatedPost = await req.app.get('db')
    .update_services_post(id, title, imageUrl, text)
    res.status(200).send(updatedPost)
  },
  deleteServicePost: async (req, res) => {
    const { id } = req.params
    const posts = await req.app.get('db')
    .delete_services_post(id)
    res.status(200).send(posts)
  },

  getInfoPosts: async (req, res) => {
    const posts = await req.app.get('db')
    .get_info_posts()
    res.status(200).send(posts)
  },
  addInfoPost: async (req, res) => {
    const { title, imageUrl, text } = req.body
    const posts = await req.app.get('db')
    .add_info_post(title, imageUrl, text)
    res.status(200).send(posts)
  },
  editInfoPost: async (req, res) => {
    const { title, imageUrl, text } = req.body
    const { id } = req.params
    const updatedPost = await req.app.get('db')
    .update_info_post(id, title, imageUrl, text)
    res.status(200).send(updatedPost)
  },
  deleteInfoPost: async (req, res) => {
    const { id } = req.params
    console.log(id)
    const posts = await req.app.get('db')
    .delete_info_post(id)
    console.log(posts)
    res.status(200).send(posts)
  },


  getApptRequests: async (req, res) => {
    const reqAppts = await req.app.get('db').get_appt_reqs()
    res.status(200).send(reqAppts)
  },
  deleteApptRequest: async (req, res) => {
    const { id } = req.params
    const appt = await req.app.get('db').delete_appt_req(id)
    res.status(200).send(appt)
  },
  requestAppointment: async (req, res) => {
    const { firstName, lastName, email, phone, timeToCall } = req.body
    const id = await req.app.get('db').req_appt(firstName, lastName)
    await req.app.get('db').req_info(id[0].id, email, phone, timeToCall)

client.messages
  .create({
     body: 'New request from patient to schedule an appointment',
     from: TWILIO_NUMBER,
     to: PHONE_NUMBER
   })
  .then(message => console.log(message.sid));
    res.status(200).send('Request succesful')

    transporter.sendMail(mailOptions, function(err) {
      if(err) {
        console.log('Error sending email')
      }else{
        console.log('Email sent!!!')
      }
    })
  },
}
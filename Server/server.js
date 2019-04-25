require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./Controller/authCtrl')
const app = express ()
const Ctrl = require('./Controller/controller')

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('db is connected')
  app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))
})

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookies: {
    maxAge: 1000 * 60 * 60
  }
}))

// check for sesison
app.get('/checkForUser', Ctrl.checkForUser)

// About
app.get('/api/about/posts', Ctrl.getAboutPosts)
app.post('/api/addAboutPost', Ctrl.addAboutPost)
app.put('/api/about/edit/:id', Ctrl.editAboutPost)
app.delete('/api/about/deletePost/:id', Ctrl.deleteAboutPost)

// Services
app.get('/api/services/posts', Ctrl.getServicePosts)
app.post('/api/addServicesPost', Ctrl.addServicesPost)
app.put('/api/services/edit/:id', Ctrl.editServicesPost)
app.delete('/api/services/deletePost/:id', Ctrl.deleteServicePost)

// Information
app.get('/api/info/posts', Ctrl.getInfoPosts)
app.post('/api/addInfoPost', Ctrl.addInfoPost)

app.delete('/api/info/deletePost/:id', Ctrl.deleteInfoPost)

// Admin
app.post('/api/reqAppointment', Ctrl.requestAppointment)
app.get('/api/apptReqs', Ctrl.getApptRequests)
app.delete('/api/apptReq/:id', Ctrl.deleteApptRequest)

// login logout
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/logout', (req, res) => {
  req.session.destroy()
})


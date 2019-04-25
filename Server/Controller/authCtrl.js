const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const { userName, password } = req.body
    const db = req.app.get('db')
    const userArr = await db.find_user([userName])
    if(userArr[0]){
      return res.status(400).send({message: 'User name taken'})
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    let newUserArr = await db.register_user([userName, hash])
    req.session.user = {userName: newUserArr[0].username, id: newUserArr[0].user_id}
    res.status(200).send({
      message: 'logged in',
      userData: req.session.user,
      loggedIn: true
    })
  },

  login: async (req, res) => {
    const { userName, password } = req.body
    const db = req.app.get('db')
    const userArr = await db.find_user([userName])
    if(userArr.length === 0) {
      return res.status(401).send({message: 'User Not found'})
    }
    const result = bcrypt.compareSync(password, userArr[0].password)
    if(!result) {
      return res.status(401).send({message: 'Incorrect Password'})    
    }
    req.session.user = { userName: userArr[0].username, id: userArr[0].user_id}
    res.status(200).send({
      message: 'logged in',
      userData: req.session.user,
      loggedIn: true
    })
  },
}
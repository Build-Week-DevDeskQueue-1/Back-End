const router = require('express').Router();
const db = require('../data/dbaccess')
const bcrypt = require('bcryptjs');

const requireUsernameAndPassword = (req, res, next) => {
  if (!("username" in req.body) || !("password" in req.body)) {
    res.status(400).send("Missing username or password")
  } else {
    next()
  }
}

router.post('/register', requireUsernameAndPassword, (req, res) => {
  const user = req.body
  bcrypt.hash(user.password, 10, (err, hash) => {
    db.register({ ...user, password:hash})
    .then(() => res.status(200).send("Registered Successfully"))
    .catch((error) => res.status(401).send(error))
  })
})

router.post('/login', requireUsernameAndPassword, (req, res) => {
  const user = req.body
  db.user(user)
  .then(response => {
    bcrypt.compare(user.password, response.password, (err, result) => {
      if (result) {
        req.session.user = {
          id: response.id,
          username: response.username,
          is_student: response.is_student,
          is_helper: response.is_helper
        }
        console.log(`${user.username} has logged in`)
        res.status(200).send("Logged in")
      } else {
        res.status(401).send("Invalid credentials")
      }
    })
  })
  .catch(error => res.status(400).send("Account doesn't exist"))
})

router.post('/logout', (req, res) => {
  if (req.session.user) {
    console.log(`${req.session.user.username} has logged out`)
    req.session.destroy()
    res.status(200).send("Logged out")
  } else {
    res.status(400).send("Not logged in")
  }
})

module.exports = router
const router = require('express').Router();
const db = require('../data/dbaccess')

const protected = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.status(401).send("Must be logged in")
  }
};

router.use('/', protected)

router.get('/', (req, res) => {
  db.tickets(req.body.id || null)
  .then(response => {
    const tickets = response;
    res.status(200).send(tickets)
  })
  .catch(error => res.status(401).send("Something went wrong, probably invalid ticket id"))
})

router.post('/assign', (req, res) => {
  db.assignTicket(req.body.id, req.session.user.id)
  .then(response => res.status(200).send("Successfully assigned to ticket"))
  .catch(error => res.status(401).send("Something went wrong, probably invalid ticket id"))
})

module.exports = router;
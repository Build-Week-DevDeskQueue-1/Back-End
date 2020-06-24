const router = require('express').Router();
const db = require('../data/dbaccess')

const mustBeLoggedIn = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.status(401).send("Must be logged in")
  }
};

router.use('/', mustBeLoggedIn)

router.get('/', (req, res) => {
  db.tickets(req.body.id || null)
  .then(response => {
    const tickets = response;
    res.status(200).send(tickets)
  })
  .catch(error => res.status(401).send("Something went wrong, probably invalid ticket id"))
})

router.post('/', (req, res) => {
  db.createTicket(req.body, req.session.user.id)
  .then(response => res.status(200).send("Successfully created ticket"))
  .catch(error => res.status(401).send("Something went wrong, probably missing required fields (title, description, category, tried"))
})

router.put('/assign', (req, res) => {
  db.assignTicket(req.body.id, req.session.user.id)
  .then(response => res.status(200).send("Successfully assigned to ticket"))
  .catch(error => res.status(401).send("Something went wrong, probably invalid ticket id"))
})

router.put('/status', (req, res) => {
  db.resolveOrReopen(req.body.id, req.body.action)
  .then(response => {
    if (req.body.action === 'resolve') {
      res.status(200).send("Ticket status changed to resolved")
    } else
    if (req.body.action) {
      res.status(200).send("Ticket reopened")
    }
  }) //fails silently if given an invalid ticket id, no clue why
  .catch(error => res.status(401).send("Something went wrong, probably invalid ticket id"))
})

module.exports = router;
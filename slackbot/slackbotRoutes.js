const router = require('express').Router();
const db = require('../data/dbaccess')
const parser = require('body-parser')

router.use(parser.urlencoded({ extended: true }))

router.post('/test', (req, res) => {
  console.log("req.body:", req.body)
  res.status('200').send("thanks")
})

router.post('/newticket', async (req, res) => {
  console.log(req.body)
  const text = req.body.text;
  const ticketArray = text.split(' ')
  const ticket = {
    title: ticketArray[0],
    description: ticketArray[1],
    tried: ticketArray[2],
    category: ticketArray[3]
  }
  console.log(ticket)
  const id = await db.slackUser(req.body.user_name)
  console.log("id from post route: ", id)
  db.createTicket(ticket, id)
  .then(response => res.status(200).send("Successfully created ticket"))
  .catch(error => {
    console.log(error)
    res.status(401).send("Something went wrong, probably missing required fields (title, description, category, tried")
  })
})

router.post('/tickets', (req, res) => {
  console.log(req.body)
  const text = req.body.text || '';

  if (text === "all") {
    db.tickets()
    .then(response => {
      const tickets = response;
      res.status(200).send(tickets)
    })
  .catch(error => res.status(401).send("Something went wrong"))
  } else if (text.length === 0) {
    db.tickets()
    .then(response => {
      const tickets = response;
      var openTickets = [];
      tickets.forEach(element => {
        if(element.status === "open") {
          openTickets.push(element)
        }
      })
      res.status(200).send(openTickets)
    })
  .catch(error => res.status(401).send("Something went wrong"))
  } else {
    db.tickets(parseInt(text))
    .then(response => {
      const tickets = response;
      res.status(200).send(tickets)
    })
  .catch(error => res.status(401).send("Something went wrong, probably invalid ticket id"))
  }
})

module.exports = router
require('newrelic');

const express = require('express');
const server = express();
const PORT = process.env.PORT || 3003;

const db = require('./data/dbconfig')
const authRoutes = require('./routes/authRoutes')
const ticketRoutes = require('./routes/ticketRoutes')
const slackRoutes = require('./slackbot/slackbotRoutes')
const session = require('express-session');
const cors = require('cors')

server.use(
  session({
    secret: process.env.secret || 'banana-man',
    cookie: {
      maxAge: false
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
  })
);

server.use(express.json())

server.use(cors({origin: ["http://localhost:3000", "https://devdesk-silk.vercel.app/"], credentials: true}))

/* server.use('/*', (req, res, next) => {
  console.log(req.body)
  next()
}) */

server.use((req, res, next) => {
  if(req.session.user) {
    console.log(req.session.user.username)
  } else {
    console.log("no user session")
  }
  
  next()
})

server.use('/auth', authRoutes)
server.use('/tickets', ticketRoutes)
server.use('/slack', slackRoutes)



server.get('/test', (req, res) => {
  res.status(200).send("hello")
})

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});


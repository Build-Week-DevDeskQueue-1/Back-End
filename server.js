const express = require('express');
const server = express();
const PORT = process.env.PORT || 3003;

const db = require('./data/dbconfig')
const authRoutes = require('./routes/authRoutes')
const ticketRoutes = require('./routes/ticketRoutes')

const session = require('express-session');

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

const reqLogger = (req, res, next) => {
  console.log(req.body)
  next()
}

server.use(reqLogger)
server.use(express.json())
server.use('/auth', authRoutes)
server.use('/tickets', ticketRoutes)

server.get('/test', (req, res) => {
  res.status(200).send("hello")
})

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});


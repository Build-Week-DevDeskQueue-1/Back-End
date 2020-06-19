const router = require('express').Router();
const db = require('../data/dbaccess')
const parser = require('body-parser')

router.use(parser.urlencoded({ extended: true }))

router.post('/test', (req, res) => {
  console.log(req.body)
  res.status('200').send("thanks")
})

module.exports = router
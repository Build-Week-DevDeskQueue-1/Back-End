const router = require('express').Router();
const db = require('../data/dbaccess')

router.post('/', (req, res) => {
  console.log(req.body)
  res.status('200').send("thanks")
})

module.exports = router
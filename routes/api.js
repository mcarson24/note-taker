const express = require('express')

const router = express.Router()

router.get('/notes', (req, res) => {
  res.send(`Just hit the /api/notes route with a ${req.method} method.`)
})

router.post('/notes', (req, res) => {
  res.send(`Just hit the /api/nores route with a ${req.method} method.`)
})

module.exports = router
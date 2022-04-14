const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()

const dbPath = path.join(__dirname, '../db/db.json')

router.get('/notes', (req, res) => {
  fs.readFile(dbPath, { encoding: 'utf-8'}, (err, data) => {
    if (!err) res.json(JSON.parse(data))
    else console.error(err)
  })
})

router.post('/notes', (req, res) => {
  const { title, text } = req.body
  fs.readFile(dbPath, { encoding: 'utf-8' }, (err, data) => {
    if (!err) {
      const notes = JSON.parse(data)
      notes.push({ title, text })
      fs.writeFile(dbPath, JSON.stringify(notes), err => console.error(err))
      res.redirect('/notes')
    } else console.error(err)
  })
})

module.exports = router
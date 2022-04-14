const { response } = require('express')
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
      if (!title.trim().length || !text.trim().length) {
        return res.status(400, '/notes').json({
          status: 400,
          message: 'Each note requires a title and text content'
        })
      } else {
        const notes = JSON.parse(data)
        const newNote = { title, text }
        notes.push(newNote)
        fs.writeFile(dbPath, JSON.stringify(notes), err => console.error(err))
        res.status(201).json(newNote)
      }
    } else console.error(err)
  })
})

module.exports = router
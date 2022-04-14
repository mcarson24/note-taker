const express = require('express')
const { index, create, destroy} = require('../controllers/notes_controller')

const router = express.Router()

router.get('/notes', (req, res) => index(req, res))
router.post('/notes', (req, res) => create(req, res))
router.delete('/notes/:uuid', (req, res) => destroy(req, res))

module.exports = router
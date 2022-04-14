const express = require('express')
const api = require('./routes/api')
const static = require('./routes/static')

const app = express()
const PORT = process.ENV || 3000

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
// app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'))
app.use('/api', api)
app.use(static)

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))
const express = require('express')
const notes = require('./routes/notes')
const static = require('./routes/static')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))
app.use(express.json())

app.use('/api', notes)
app.use(static)

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))
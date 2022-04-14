const express = require('express')
const { sendFile } = require('express/lib/response')

const app = express()
const PORT = process.ENV || 3000

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'))

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))
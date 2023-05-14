const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

const clientAgency = require('./routes/mainRoute')

app.use('/api/v1',clientAgency)

module.exports = app;
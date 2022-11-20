const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const route = require('./routes/route')
const app = express()

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((e) => {
  console.log('There has been an error', e)
})

app.use(cors())

app.use(bodyParser.json())

app.use('/api', route)

module.exports = app
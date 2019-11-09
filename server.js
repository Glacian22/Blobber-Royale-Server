'use strict'

// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server
// ******************************************************************************

// Dependencies
// =============================================================
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const mongoose = require('mongoose')
// const passport = require('./config/passport')

// Sets up the Express App
// =============================================================
const app = express()

const http = require('http').createServer(app)
const io = require('socket.io')(http)

const PORT = process.env.PORT || 3030

app.use(cors())

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Sets up Express Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))
// app.use(passport.initialize())
// app.use(passport.session())

// Requiring our models for syncing
// const db = require('./models')

// Routes
// require('./routes').authRoutes(app)
require('./routes').apiRoutes(app)

io.on('connection', function (socket) {
  console.log(socket.id, 'Connected!')
  socket.on('disconnect', function () {
    console.log(socket.id, 'Disconnected!')
  })
})

// Syncing our Mongoose models and then starting our Express app
// =============================================================
// TODO: check for test flag for MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/blobber-royale'
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })

http.listen(PORT, function () {
  console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT)
})

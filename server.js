'use strict'

// ******************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server
// ******************************************************************************

// Dependencies
// =============================================================
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
// const passport = require('./config/passport')

const PORT = process.env.PORT || 3030

// Sets up the Express App
// =============================================================
const app = express()

const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(cors())
app.use(morgan('dev'))

// Setting up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Setting up Express Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

// Setting up the Passport plugin for Express
// app.use(passport.initialize())
// app.use(passport.session())

// Requiring routes
// require('./routes').authRoutes(app)
require('./routes').apiRoutes(app)

// Setting up socket.io
// =============================================================
io.on('connection', function (socket) {
  console.log(socket.id, 'Connected!')
  socket.on('disconnect', function () {
    console.log(socket.id, 'Disconnected!')
  })
})

// Syncing our Mongoose models
// =============================================================
// TODO: check for test flag for MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/blobber-royale'
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })

// Starting the Express app
// =============================================================
http.listen(PORT, function () {
  console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT)
})

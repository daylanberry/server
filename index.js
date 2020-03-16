const express = require('express');
require('./models/user')
require('./services/passport')
const keys = require('./config/keys.js')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')


mongoose.connect(keys.mongoURI)

console.log(process.env)

const app = express()

app.use(
  cookieSession({
    //must be in ms
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)


app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000
//http://localhost:5000/auth/google/callback


app.listen(PORT, () => console.log('connected to ' + PORT))
const express = require('express');
require('./models/user')
require('./services/passport')
const keys = require('./config/keys.js')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const path = require('path')


mongoose.connect(keys.mongoURI)


const app = express()
app.use(bodyParser.json())


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
require('./routes/billingRoutes')(app)

if (process.env.NODE_ENV === 'production') {

  app.use(express.static(path.join(__dirname, 'client/build')))


  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/client/build/index.html'))
  })
}

const PORT = process.env.PORT || 5000
//http://localhost:5000/auth/google/callback


app.listen(PORT, () => console.log('connected to ' + PORT))
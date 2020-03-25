const express = require('express');
require('./models/user')
require('./models/survey')
require('./services/passport')
const keys = require('./config/keys.js')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')


mongoose.connect(keys.mongoURI)


const app = express()
app.use(bodyParser.json())
app.use(cors())

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
require('./routes/surveyRoutes')(app)

if (process.env.NODE_ENV === 'production') {

  app.use(express.static(path.join(__dirname, 'client/build')))


  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000


app.listen(PORT, () => console.log('connected to ' + PORT))



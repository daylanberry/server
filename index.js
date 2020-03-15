const express = require('express');
require('./models/user')
require('./services/passport')
const keys = require('./config/keys.js')
const mongoose = require('mongoose')

mongoose.connect(keys.mongoURI)

const app = express()


require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000
//http://localhost:5000/auth/google/callback


app.listen(PORT, () => console.log('connected to ' + PORT))
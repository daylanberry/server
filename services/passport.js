const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js')
const mongoose = require('mongoose')

//one argument means we are trying to fetch from db
const User = mongoose.model('users')

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, cb) => {

    User.findOne({googleID: profile.id})
    .then((existingUser) => {
      console.log(existingUser)
      if (existingUser) {
        console.log('exists')
        return
      } else {
        new User({ googleID: profile.id}).save()
      }
    })
  }

))

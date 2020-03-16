const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js')
const mongoose = require('mongoose')


//one argument means we are trying to fetch from db
const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  console.log('passport', user)
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    })
})


passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {

    User.findOne({googleID: profile.id})
    .then((existingUser) => {
      if (existingUser) {
        console.log('exists')
        done(null, existingUser)
        return
      } else {
        new User({ googleID: profile.id})
          .save()
          .then(user => done(null, user))
          .catch(err => console.log(err))
      }
    })
    .catch(err=> console.log(err))
  }

))

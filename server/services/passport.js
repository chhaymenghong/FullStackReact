const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users'); // retrieve this collection

// Tell passport to use google oauth for authentication
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },

        // Get executed when a user is actually executed. we can store this on the database
        // to link this token to a user for later use.
        (accessToken, refreshToken, profile, done) => {
            User.findOne({googleId: profile.id})
                .then( existingUser => {
                    if ( existingUser ) {
                        // first arg: no error, second arg: tell passport that this is the user that we just created
                        done(null, existingUser);
                    } else {

                        new User({ googleId: profile.id }) // create a user model instance
                            .save() //save it to db
                            .then(user => done(null, user)); // finish saving, so we need to call done to finish the OAuth process
                    }
                });
        } )
);
// require belongs to commonjs spec that Node uses to import modules
// node hasn't implemented the "import" feature belong to es6 yet
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

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
            console.log(accessToken);
            console.log(refreshToken);
            console.log(profile);
            console.log('hi');
        } )
);

app.get('/', (req, res) => {
   res.send({hi: 'sdfsf'});
});

// Use google strategy to handle this authentication. ( google is an identifier built into GoogleStrategy )
// Also we are asking for user's profile and emails.
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Handle callback from Google OAuth. Google will give us a code that can be sent back to it
// to get more information about the user
app.get('/auth/google/callback', passport.authenticate('google'));

// since we are using Heroku to host this server, we need to accept the port number given by Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);
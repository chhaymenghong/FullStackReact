// Require the original passport module, not our own
const passport = require('passport');

module.exports = (app) => {
// Use google strategy to handle this authentication. ( google is an identifier built into GoogleStrategy )
// Also we are asking for user's profile and emails.
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

// Handle callback from Google OAuth. Google will give us a code that can be sent back to it
// to get more information about the user
    app.get('/auth/google/callback', passport.authenticate('google'));
    app.get('/api/current_user', (req, res) => {
       res.send(req.user);
    });
};
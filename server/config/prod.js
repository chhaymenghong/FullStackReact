/** Prod config **/
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongooseUri: process.env.MONGOOSE_URI,
    cookieKey: process.env.COOKIE_KEY // use to encrypt cookie info
};
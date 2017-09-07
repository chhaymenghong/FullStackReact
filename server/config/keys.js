/** Figure out whether we are in prod or dev and use the right config **/
// This is set my heroku. If run locally, this won't be set
if ( process.env.NODE_ENV === 'production' ) {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}
// Require belongs to commonjs spec that Node uses to import modules
// node hasn't implemented the "import" feature belong to es6 yet
const express = require('express');

// Run the passport configuration
require('./services/passport');

const app = express();
require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
   res.send({hi: 'sdfsf'});
});

// since we are using Heroku to host this server, we need to accept the port number given by Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);
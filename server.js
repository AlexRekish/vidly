const express = require('express');
const winston = require('winston');

const app = express();
require('./startups/logging')();
require('./startups/routes')(app);
require('./startups/db')();
require('./startups/config')();
require('./startups/validation')();

const port = process.env.PORT || 3502;

const server = app.listen(port, () => {
  winston.info('Listening on port 3502...');
});

module.exports = server;

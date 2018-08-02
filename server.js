const express = require('express');
const winston = require('winston');

const app = express();
require('./startups/logging')();
require('./startups/routes')(app);
require('./startups/db')();
require('./startups/config')();
require('./startups/validation')();

app.listen(3502, () => {
  winston.info('Listening on port 3502...');
});

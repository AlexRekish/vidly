const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = () => {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log', level: 'info' }),
  );

  process.on('unhandledRejection', (err) => {
    throw err;
  });

  winston.add(new winston.transports.Console({ colorize: true, prettyPrint: true }));
  winston.add(new winston.transports.File({ filename: 'logfile.log', handleExceptions: true }));
  // winston.add(new winston.transports.MongoDB({
  //   db: 'mongodb://localhost:27017/Vidly',
  //   level: 'info',
  // }));
};

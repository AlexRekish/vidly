const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
  mongoose.connect('mongodb://localhost:27017/Vidly', { useNewUrlParser: true })
    .then(() => winston.info('Connected to Mongo...'));
};

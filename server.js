const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');

const app = express();

mongoose.connect('mongodb://localhost:27017/Vidly', { useNewUrlParser: true })
  .then(() => console.log('Connected to Mongo...'))
  .catch(err => console.warn('Something went wrong...', err));

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);


app.listen(3502, () => {
  console.log('Listening on port 3502...');
});

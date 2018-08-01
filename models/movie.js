const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const Movie = mongoose.model('Movie', mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 50,
    trim: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
}));

const validateMovie = (movie) => {
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(5).required(),
  };
  return Joi.validate(movie, schema);
};

module.exports = {
  Movie,
  validate: validateMovie,
};

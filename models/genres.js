const mongoose = require('mongoose');
const Joi = require('joi');

const validateGenre = (genre) => {
  const schema = {
    name: Joi.string().min(3).max(20).required(),
  };
  return Joi.validate(genre, schema);
};

const Genre = mongoose.model('Genre', mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
}));

module.exports = {
  Genre,
  validate: validateGenre,
};

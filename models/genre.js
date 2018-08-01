const mongoose = require('mongoose');
const Joi = require('joi');

const validateGenre = (genre) => {
  const schema = {
    name: Joi.string().min(3).max(20).required(),
  };
  return Joi.validate(genre, schema);
};

const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = {
  Genre,
  genreSchema,
  validate: validateGenre,
};

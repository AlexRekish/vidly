const mongoose = require('mongoose');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');

const validateUser = (user) => {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi
      .string()
      .min(5)
      .max(50)
      .required()
      .email(),
    password: Joi.string().min(10).max(1024).required(),
  };
  return Joi.validate(user, schema);
};

const validatePassword = (password) => {
  const complexityOptions = {
    min: 10,
    max: 1024,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
  };

  return Joi.validate(password, new PasswordComplexity(complexityOptions));
};

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1024,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  userSchema,
  validatePassword,
  validate: validateUser,
};

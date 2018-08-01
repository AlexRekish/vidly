const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 30,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxLength: 15,
    trim: true,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
}));

const validateCustomer = (customer) => {
  const schema = {
    name: Joi.string().min(2).max(30).required(),
    phone: Joi.string().min(5).max(15).required(),
    isGold: Joi.boolean(),
  };
  return Joi.validate(customer, schema);
};

module.exports = {
  Customer,
  validate: validateCustomer,
};

const mongoose = require('mongoose');
const Joi = require('joi');

const Rental = mongoose.model('Rental', mongoose.Schema({
  customer: {
    type: mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15,
        trim: true,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
    }),
    required: true,
  },
  movie: {
    type: mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
}));

const validateRental = (customer) => {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };
  return Joi.validate(customer, schema);
};

module.exports = {
  Rental,
  validate: validateRental,
};

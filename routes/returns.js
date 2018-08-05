const express = require('express');
const Joi = require('joi');
const auth = require('../middleware/auth');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
// const admin = require('../middleware/admin');
const validate = require('../middleware/validate');

const router = express.Router();

const validateReturns = (returns) => {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };
  return Joi.validate(returns, schema);
};

router.post('/', [auth, validate(validateReturns)], async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);
  if (!rental) return res.status(404).send('Rental is not found');
  if (rental.dateReturned) return res.status(400).send('Rental is already processed');

  rental.return();
  await rental.save();

  await Movie.update({ _id: req.body.movieId },
    {
      $inc: { numberInStock: 1 },
    });
  return res.send(rental);
});

module.exports = router;

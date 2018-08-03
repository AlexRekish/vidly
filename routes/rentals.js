const express = require('express');
const Fawn = require('fawn');
const mongoose = require('mongoose');
const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();
Fawn.init(mongoose);

router.get('/', [auth, admin], async (req, res) => {
  const rentals = await Rental.find().sort({ dateOut: -1 });
  return res.send(rentals);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie');

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer');

  if (movie.numberInStock === 0) return res.status(400).send('There are not available movie now');

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  try {
    new Fawn.Task()
      .save('rentals', rental)
      .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
      .run();
    return res.send(rental);
  } catch (err) {
    return res.status(500).send('Something went wrong');
  }
});

module.exports = router;

const express = require('express');
const auth = require('../middleware/auth');
const { Rental } = require('../models/rental');
// const validateObjectId = require('../middleware/validateObjectId');
// const admin = require('../middleware/admin');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  if (!req.body.customerId) return res.status(400).send('customerId is not provided');
  if (!req.body.movieId) return res.status(400).send('movieId is not provided');

  const rental = await Rental.findOne({
    'customer._id': req.body.customerId,
    'movie._id': req.body.movieId,
  });
  if (!rental) return res.status(404).send('Rental is not found');
  if (rental.dateReturned) return res.status(400).send('Rental is already processed');
  return res.status(200).send();
});

module.exports = router;

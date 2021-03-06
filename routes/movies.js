const express = require('express');
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const admin = require('../middleware/admin');
const validator = require('../middleware/validate');

const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort({ title: 1 });
  return res.send(movies);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie
    .findById(req.params.id);
  if (!movie) return res.status(404).send('ID not found!');
  return res.send(movie);
});

router.post('/', [auth, validator(validate)], async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre!');

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  return res.send(movie);
});

router.put('/:id', [auth, admin, validateObjectId, validator(validate)], async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre');

  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  }, { new: true });
  if (!movie) return res.status(404).send('ID not found!');
  return res.send(movie);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) return res.status(404).send('ID not found!');
  return res.send(movie);
});

module.exports = router;

const express = require('express');
const auth = require('../middleware/auth');
const { Genre, validate } = require('../models/genre');
const validateObjectId = require('../middleware/validateObjectId');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  return res.send(genres);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const genre = await Genre
    .findById(req.params.id);
  if (!genre) return res.status(404).send('ID not found!');
  return res.send(genre);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  return res.send(genre);
});

router.put('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre
    .findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  if (!genre) return res.status(404).send('ID not found!');
  return res.send(genre);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const genre = await Genre
    .findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('ID not found!');
  return res.send(genre);
});

module.exports = router;

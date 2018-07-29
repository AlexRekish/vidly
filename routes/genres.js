const express = require('express');
const Joi = require(`joi`);
const router = express.Router();

const validateGenre = (genre) => {
  const schema = {
    name: Joi.string().min(3).max(20).required()
  };
  return Joi.validate(genre, schema);
};

const genres = [{
    name: `comedy`,
    id: 1,
  },
  {
    name: `horror`,
    id: 2,
  },
  {
    name: `action`,
    id: 3,
  },
];


router.get(`/`, (req, res) => {
  res.send(genres);
});

router.get(`/:id`, (req, res) => {
  const index = genres.findIndex((val) => val.id === +req.params.id);
  if (index === -1) {
    return res.status(404).send(`ID not found!`);
  }
  res.send(genres[index]);
})

router.post(`/`, (req, res) => {
  const {
    error
  } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = {
    name: req.body.name,
    id: genres.length + 1
  };

  genres.push(genre);
  res.send(genre);

});

router.put(`/:id`, (req, res) => {
  const {
    error
  } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const index = genres.findIndex((val) => val.id === +req.params.id);
  if (index === -1) {
    return res.status(404).send(`ID not found!`);
  }
  genres[index].name = req.body.name;
  res.send(genres[index]);

})

router.delete(`/:id`, (req, res) => {
  const index = genres.findIndex((val) => val.id === +req.params.id);
  if (index === -1) {
    return res.status(404).send(`ID not found!`);
  }
  res.send(genres.splice(index, 1));
});

module.exports = router;

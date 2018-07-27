const express = require(`express`);
const Joi = require(`joi`);
const app = express();

app.use(express.json());

const validateGenre = (genre) => {
  const schema = {
    name: Joi.string().min(3).max(20).required()
  };
  return Joi.validate(genre, schema);
};

const genres = [
  {
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

app.get(`/api/genres`, (req, res) => {
  res.send(genres);
});

app.get(`/api/genres/:id`, (req, res) => {
  const index = genres.findIndex((val) => val.id === +req.params.id);
  if (index === -1) {
    return res.status(404).send(`ID not found!`);
  }
  res.send(genres[index]);
})

app.post(`/api/genres`, (req, res) => {
  const {error} = validateGenre(req.body);
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

app.put(`/api/genres/:id`, (req, res) => {
  const {error} = validateGenre(req.body);
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

app.delete(`/api/genres/:id`, (req, res) => {
  const index = genres.findIndex((val) => val.id === +req.params.id);
  if (index === -1) {
    return res.status(404).send(`ID not found!`);
  }
  res.send(genres.splice(index, 1));
});

app.listen(3502, () => {
  console.log(`listening on port 3502...`);
});

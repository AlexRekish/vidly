const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const { User } = require('../models/user');
const validator = require('../middleware/validate');

const router = express.Router();

const validate = (user) => {
  const schema = {
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

router.post('/', validator(validate), async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password');

  const password = await bcrypt.compare(req.body.password, user.password);
  if (!password) return res.status(400).send('Invalid email or password');

  const token = user.generateAuthToken();
  return res.send(token);
});

module.exports = router;

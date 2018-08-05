const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const auth = require('../middleware/auth');
const { User, validate, validatePassword } = require('../models/user');
const validator = require('../middleware/validate');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select({ password: 0 });
  return res.send(user);
});

router.post('/', validator(validate), async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered');

  const password = validatePassword(req.body.password);
  if (password.error) return res.status(400).send(password.error.details[0].message);

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  return res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;

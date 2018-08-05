const express = require('express');
const { Customer, validate } = require('../models/customer');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const admin = require('../middleware/admin');
const validator = require('../middleware/validate');


const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort({ name: 1 });
  return res.send(customers);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id).sort({ name: 1 });
  if (!customer) return res.status(404).send('Customer with current ID not found!');
  return res.send(customer);
});

router.post('/', validator(validate), async (req, res) => {
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();
  return res.send(customer);
});

router.put('/:id', [auth, admin, validateObjectId, validator(validate)], async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  }, { new: true });
  if (!customer) return res.status(404).send('Customer with current ID not found!');
  return res.send(customer);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send('Customer with current ID not found!');
  return res.send(customer);
});

module.exports = router;

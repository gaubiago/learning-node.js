const { Customer, validate }  = require('../models/customer')
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().sort('name');
    res.send(customers);
  }
  catch (err) {
    console.error('Not able to retrieve documents. ', err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
  }
  catch (err) {
    console.error('Not able to retrieve documents.', err.message);
  }
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const customer = new Customer({ 
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone
    });
    await customer.save();
    res.send(customer);
  }
  catch (err) {
    console.error('Not able to retrieve documents. ', err);
  }
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, { 
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone
    }, { new: true });
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
  }
  catch (err) {
    console.error('Not able to retrieve documents.', err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
  }
  catch (err) {
    console.error('Not able to retrieve documents.', err);
  }
});

module.exports = router;
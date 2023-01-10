const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const { isJoi } = require('joi/lib/types/lazy');
const router = express.Router();


router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  res.send(true);
})


function validate(req) {
  const schema = {
    email: Joi.string().required().min(5).max(255).email(),
    // password sent by the user in plain text
    password: Joi.string().required().min(12).max(255)
  }

  return Joi.validate(req, schema);
}
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 12,
    maxlength: 1024
  }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().required().min(1).max(255),
    email: Joi.string().required().min(5).max(255).email(),
    // password sent by the user in plain text
    password: Joi.string().required().min(12).max(255)
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
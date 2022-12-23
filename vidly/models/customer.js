const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  // if _id is String, use the line below
  // _id: { type: String, default: () => (new mongoose.Types.ObjectId()).toHexString() },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    required: true
  },
  phone: {
    type: String,
    required: true,
    minlength: 7
  }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
  const schema = {
    isGold: Joi.boolean().required(),
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(7).required() 
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
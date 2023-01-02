const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

const movieSchema = mongoose.Schema({
  // if _id is String, use the line below
  // _id: { 
  //   type: String, 
  //   default: () => (new mongoose.Types.ObjectId()).toHexString()
  // },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255

  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(), // instead of "genre", because ... 
    // ... we want the client to send only the genre ID
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
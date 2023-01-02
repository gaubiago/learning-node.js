const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut'); // descending order
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error)  return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  let rental  = Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  // BEFORE USING FAWN
  // rental = await rental.save();

  // movie.numberInStock--;
  // movie.save();

  // USING FAWN
  try {
    new Fawn.Task()
      // Pass in the actual name of the collection
      .save('rentals', rental)
      // 2nd arg.: ID of the movie doc. to be updated
      // 3rd arg.: update object
      .update('movies', { _id: movie._id }, {
        $inc: { numberInStock: -1 }
      })
      .run();

      res.send(rental);
  }
  catch (error) {
    // Internal server error
    res.status(500).send('Something failed.');
    // Then you log the error in a real world application
  }

});

module.exports = router;
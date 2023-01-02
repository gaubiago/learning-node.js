const { Movie, validate } = require('../models/movie');
const express = require('express');
const { Genre } = require('../models/genre');
const { Customer } = require('../models/customer');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().sort('title');
    res.send(movies);
  }
  catch (err) {
    console.error('Not able to retrieve documents.', err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.send(movie);
  }
  catch (err) {
    console.error('Not able to retrieve documents.', err);
  }
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  try {
    const movie = new Movie({
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();
    res.send(movie);
  }
  catch (err) {
    console.error('Not able to retrieve documents.', err);
  }
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      genre: genre,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.send(movie);
  }
  catch (err) {
    console.error('Not able to retrieve documents.', err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.send(movie);
  }
  catch (err) {
    console.error('Not able to retrieve documents.', err);
  }
});

module.exports = router;

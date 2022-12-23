const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/vidly')
  .then(() => console.log('Connected to the database.'))
  .catch(() => console.log('Failed to connect to the database.'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
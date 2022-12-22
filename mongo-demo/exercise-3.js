const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-exercises')
  .then(() => console.log('Connected to the database...'))
  .catch(error => console.error('Failed to connect... ', error));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('course', courseSchema);

async function getCourses() {
  return await Course.find({ isPublished: true})
    .or([ 
      { price: { $gte: 15 } }, 
      { name: /.*by.*/i } 
    ])
    .sort('-price')
    .select('name author price');
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();

getCourses();
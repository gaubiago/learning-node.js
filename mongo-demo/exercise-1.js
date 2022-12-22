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
  return await Course.find({ isPublished: true, tags: 'backend' })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();

getCourses();
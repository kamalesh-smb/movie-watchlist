const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  genre: { type: String, required: [true, 'Genre is required'], trim: true },
  year: { type: Number, required: [true, 'Year is required'], min: [1888, 'Year is too early'], max: [2100, 'Year is too far ahead'] },
  rating: { type: Number, min: [0, 'Rating must be 0 to 10'], max: [10, 'Rating must be 0 to 10'], default: 0 },
  duration: { type: Number, min: 1, default: 90 },
  director: { type: String, trim: true, default: 'Unknown' },
  poster: { type: String, trim: true, default: '' },
  description: { type: String, trim: true, default: '' },
}, { timestamps: true });
module.exports = mongoose.model('Movie', movieSchema);

const mongoose = require('mongoose');
const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  status: { type: String, enum: ['watchlist', 'watched'], default: 'watchlist' },
}, { timestamps: true });
watchlistSchema.index({ userId: 1, movieId: 1 }, { unique: true }); // one entry per user per movie
module.exports = mongoose.model('Watchlist', watchlistSchema);

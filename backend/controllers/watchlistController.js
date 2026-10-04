const Watchlist = require('../models/Watchlist');
const Movie = require('../models/Movie');

// every query is scoped to req.userId so users only ever see their own list
exports.getWatchlist = async (req, res) => {
  const items = await Watchlist.find({ userId: req.userId }).populate('movieId').sort({ createdAt: -1 });
  res.json(items.filter((i) => i.movieId)); // skip entries whose movie was deleted
};

exports.addToWatchlist = async (req, res) => {
  const { movieId } = req.body;
  if (!movieId) return res.status(400).json({ message: 'movieId is required' });
  if (!(await Movie.exists({ _id: movieId }))) return res.status(404).json({ message: 'Movie not found' });
  try {
    const item = await Watchlist.create({ userId: req.userId, movieId });
    res.status(201).json(item);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'Already in your watchlist' });
    throw err;
  }
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  if (!['watchlist', 'watched'].includes(status)) return res.status(400).json({ message: 'Status must be "watchlist" or "watched"' });
  const item = await Watchlist.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, { status }, { new: true }).populate('movieId');
  if (!item) return res.status(404).json({ message: 'Watchlist item not found' });
  res.json(item);
};

exports.removeFromWatchlist = async (req, res) => {
  const item = await Watchlist.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  if (!item) return res.status(404).json({ message: 'Watchlist item not found' });
  res.json({ message: 'Removed from watchlist' });
};

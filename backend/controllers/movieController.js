const Movie = require('../models/Movie');
const Watchlist = require('../models/Watchlist');

const FIELDS = ['title', 'genre', 'year', 'rating', 'duration', 'director', 'poster', 'description'];
// keep only known fields and drop empty strings so schema defaults apply
const pick = (body) => Object.fromEntries(FIELDS.filter((f) => body[f] !== undefined && body[f] !== '').map((f) => [f, body[f]]));
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// GET /api/movies?search=&genre=&sort=rating|year|new&limit=
exports.getMovies = async (req, res) => {
  const { search, genre, sort, limit } = req.query;
  const filter = {};
  if (search) filter.title = new RegExp(escapeRegex(String(search)), 'i');
  if (genre && genre !== 'All') filter.genre = new RegExp(escapeRegex(String(genre)), 'i');
  const sorts = { rating: { rating: -1 }, year: { year: -1 }, new: { createdAt: -1 } };
  const movies = await Movie.find(filter).sort(sorts[sort] || { title: 1 }).limit(Math.min(Number(limit) || 100, 100));
  res.json(movies);
};

exports.getMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ message: 'Movie not found' });
  res.json(movie);
};

exports.createMovie = async (req, res) => res.status(201).json(await Movie.create(pick(req.body)));

exports.updateMovie = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, pick(req.body), { new: true, runValidators: true });
  if (!movie) return res.status(404).json({ message: 'Movie not found' });
  res.json(movie);
};

exports.deleteMovie = async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).json({ message: 'Movie not found' });
  await Watchlist.deleteMany({ movieId: movie._id });
  res.json({ message: 'Movie deleted' });
};

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api, { errMsg } from '../services/api.js';
import { Poster, useAddToWatchlist } from '../components/MovieCard.jsx';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/movies/${id}`).then((r) => setMovie(r.data)).catch((e) => setError(errMsg(e)));
  }, [id]);

  if (error) return <p className="error">{error} <Link to="/movies">Back to movies</Link></p>;
  if (!movie) return <p className="muted">Loading...</p>;
  return <Details movie={movie} />;
}

function Details({ movie }) {
  const { added, error, add } = useAddToWatchlist(movie._id);
  return (
    <section className="details">
      <Poster movie={movie} className="poster big" />
      <div>
        <h1>{movie.title}</h1>
        <p className="rating">⭐ {Number(movie.rating).toFixed(1)}/10</p>
        <dl>
          <dt>Genre</dt><dd>{movie.genre}</dd>
          <dt>Year</dt><dd>{movie.year}</dd>
          <dt>Duration</dt><dd>{movie.duration} min</dd>
          <dt>Director</dt><dd>{movie.director}</dd>
        </dl>
        <h3>Description</h3>
        <p>{movie.description || 'No description yet.'}</p>
        <button className="btn" onClick={add} disabled={added}>{added ? 'In your watchlist' : '+ Add to Watchlist'}</button>
        {error && <p className="error">{error}</p>}
      </div>
    </section>
  );
}

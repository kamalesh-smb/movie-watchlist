import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { errMsg } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export function Poster({ movie, className = 'poster' }) {
  const hue = [...movie.title].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 0);
  if (movie.poster) return <img className={className} src={movie.poster} alt={`${movie.title} poster`} loading="lazy" />;
  return (
    <div className={`${className} poster-fallback`} style={{ background: `linear-gradient(160deg,hsl(${hue} 55% 38%),hsl(${(hue + 60) % 360} 50% 16%))` }}>
      {movie.title}
    </div>
  );
}

export function useAddToWatchlist(movieId) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState({ added: false, error: '' });

  const add = async () => {
    if (!user) return navigate('/login');
    try {
      await api.post('/watchlist', { movieId });
      setState({ added: true, error: '' });
    } catch (e) {
      if (e.response?.status === 409) setState({ added: true, error: '' });
      else setState({ added: false, error: errMsg(e) });
    }
  };
  return { ...state, add };
}

export default function MovieCard({ movie }) {
  const { added, error, add } = useAddToWatchlist(movie._id);
  return (
    <article className="card">
      <Link to={`/movies/${movie._id}`}><Poster movie={movie} /></Link>
      <div className="card-body">
        <h3>{movie.title}</h3>
        <p className="meta">{movie.year} · {movie.genre}</p>
        <p className="rating">⭐ {Number(movie.rating).toFixed(1)}/10</p>
        <div className="card-actions">
          <Link className="btn ghost small" to={`/movies/${movie._id}`}>Details</Link>
          <button className="btn small" onClick={add} disabled={added}>{added ? 'In watchlist' : '+ Watchlist'}</button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </article>
  );
}

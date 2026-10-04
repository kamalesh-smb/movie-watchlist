import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { errMsg } from '../services/api.js';
import SearchBar from '../components/SearchBar.jsx';
import MovieCard from '../components/MovieCard.jsx';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [q, setQ] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/movies', { params: { sort: 'rating', limit: 8 } })
      .then((r) => setMovies(r.data))
      .catch((e) => setError(errMsg(e)));
  }, []);

  return (
    <>
      <section className="hero">
        <h1>Find Your Next Movie 🎬</h1>
        <SearchBar value={q} onChange={setQ} onSubmit={() => navigate(`/movies?search=${encodeURIComponent(q)}`)} />
        <p className="muted">Discover movies you love</p>
      </section>
      <h2>Popular Movies</h2>
      {error && <p className="error">{error}</p>}
      <div className="grid">{movies.map((m) => <MovieCard key={m._id} movie={m} />)}</div>
      {!error && movies.length === 0 && <p className="empty">No movies yet. Run <code>npm run seed</code> in the backend or add one.</p>}
    </>
  );
}

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api, { errMsg } from '../services/api.js';
import SearchBar from '../components/SearchBar.jsx';
import MovieCard from '../components/MovieCard.jsx';

const GENRES = ['All', 'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Musical', 'Romance', 'Sci-Fi', 'Thriller'];

export default function Movies() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState(params.get('search') || '');
  const [genre, setGenre] = useState('All');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // re-fetch shortly after the user stops typing
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      api.get('/movies', { params: { search, genre } })
        .then((r) => { setMovies(r.data); setError(''); })
        .catch((e) => setError(errMsg(e)))
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(t);
  }, [search, genre]);

  return (
    <>
      <h1>Movies</h1>
      <div className="filters">
        <SearchBar value={search} onChange={setSearch} placeholder="Search movies..." />
        <label>Genre:{' '}
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            {GENRES.map((g) => <option key={g}>{g}</option>)}
          </select>
        </label>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="grid">{movies.map((m) => <MovieCard key={m._id} movie={m} />)}</div>
      {!loading && !error && movies.length === 0 && <p className="empty">No movies match your search. Try another title or genre.</p>}
    </>
  );
}

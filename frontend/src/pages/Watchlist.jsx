import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { errMsg } from '../services/api.js';
import { Poster } from '../components/MovieCard.jsx';

export default function Watchlist() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/watchlist').then((r) => setItems(r.data)).catch((e) => setError(errMsg(e))).finally(() => setLoading(false));
  }, []);

  const toggle = async (item) => {
    const status = item.status === 'watched' ? 'watchlist' : 'watched';
    try {
      const { data } = await api.put(`/watchlist/${item._id}`, { status });
      setItems((list) => list.map((i) => (i._id === item._id ? data : i)));
    } catch (e) { setError(errMsg(e)); }
  };
  const remove = async (item) => {
    try {
      await api.delete(`/watchlist/${item._id}`);
      setItems((list) => list.filter((i) => i._id !== item._id));
    } catch (e) { setError(errMsg(e)); }
  };

  return (
    <>
      <h1>My Watchlist</h1>
      {error && <p className="error">{error}</p>}
      {!loading && items.length === 0 && <p className="empty">Your watchlist is empty. <Link to="/movies">Browse movies</Link> and add some.</p>}
      <div className="wl-list">
        {items.map((item) => {
          const m = item.movieId;
          const watched = item.status === 'watched';
          return (
            <article className="wl-item" key={item._id}>
              <Poster movie={m} className="poster thumb" />
              <div className="wl-info">
                <h3><Link to={`/movies/${m._id}`}>{m.title}</Link></h3>
                <p className="meta">⭐ {Number(m.rating).toFixed(1)} · {m.genre} · {m.year}</p>
                <p>Status: {watched ? '✅ Watched' : '⏳ Want to Watch'}</p>
                <div className="card-actions">
                  <button className="btn small" onClick={() => toggle(item)}>{watched ? 'Mark as Unwatched' : 'Mark as Watched'}</button>
                  <button className="btn ghost small" onClick={() => remove(item)}>Remove</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

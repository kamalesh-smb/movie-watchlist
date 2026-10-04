import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { errMsg } from '../services/api.js';

const empty = { title: '', genre: '', year: '', rating: '', duration: '', director: '', poster: '', description: '' };

export default function AddMovie() {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/movies', form);
      navigate(`/movies/${data._id}`);
    } catch (err) { setError(errMsg(err)); }
  };

  return (
    <form className="panel wide" onSubmit={submit}>
      <h1>Add Movie</h1>
      <label>Movie Name<input required value={form.title} onChange={set('title')} /></label>
      <label>Genre (comma separated)<input required placeholder="Sci-Fi, Thriller" value={form.genre} onChange={set('genre')} /></label>
      <div className="row">
        <label>Release Year<input type="number" required min="1888" max="2100" value={form.year} onChange={set('year')} /></label>
        <label>Rating (0 to 10)<input type="number" required min="0" max="10" step="0.1" value={form.rating} onChange={set('rating')} /></label>
        <label>Duration (min)<input type="number" min="1" value={form.duration} onChange={set('duration')} /></label>
      </div>
      <label>Director<input value={form.director} onChange={set('director')} /></label>
      <label>Poster URL<input type="url" placeholder="https://..." value={form.poster} onChange={set('poster')} /></label>
      <label>Description<textarea rows="4" value={form.description} onChange={set('description')} /></label>
      <button className="btn" type="submit">Add Movie</button>
      {error && <p className="error" role="alert">{error}</p>}
    </form>
  );
}

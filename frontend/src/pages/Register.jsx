import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { errMsg } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const { saveSession } = useAuth();
  const navigate = useNavigate();
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setError('Passwords do not match');
    try {
      const { data } = await api.post('/auth/register', { name: form.name, email: form.email, password: form.password });
      saveSession(data);
      navigate('/');
    } catch (err) { setError(errMsg(err)); }
  };

  return (
    <form className="panel" onSubmit={submit}>
      <h1>Create Account</h1>
      <label>Name<input required value={form.name} onChange={set('name')} /></label>
      <label>Email<input type="email" required value={form.email} onChange={set('email')} /></label>
      <label>Password<input type="password" required minLength={6} value={form.password} onChange={set('password')} /></label>
      <label>Confirm Password<input type="password" required value={form.confirm} onChange={set('confirm')} /></label>
      <button className="btn" type="submit">Register</button>
      {error && <p className="error" role="alert">{error}</p>}
      <p className="muted">Already have an account? <Link to="/login">Login</Link></p>
    </form>
  );
}

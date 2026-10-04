import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api, { errMsg } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { saveSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      saveSession(data);
      navigate(location.state?.from || '/');
    } catch (err) { setError(errMsg(err)); }
  };

  return (
    <form className="panel" onSubmit={submit}>
      <h1>Login</h1>
      <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
      <label>Password<input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
      <button className="btn" type="submit">Login</button>
      {error && <p className="error" role="alert">{error}</p>}
      <p className="muted">Don't have an account? <Link to="/register">Register</Link></p>
    </form>
  );
}

import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const onLogout = () => { logout(); navigate('/'); };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo">🎬 MovieWatchlist</Link>
        <nav className="links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/movies">Movies</NavLink>
          <NavLink to="/watchlist">My Watchlist</NavLink>
          <NavLink to="/add-movie">Add Movie</NavLink>
        </nav>
        <div className="auth">
          {user ? (
            <>
              <span>👤 {user.name}</span>
              <button className="btn ghost small" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <NavLink to="/login" className="btn small">Login</NavLink>
          )}
        </div>
      </div>
    </header>
  );
}

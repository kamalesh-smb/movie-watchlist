export default function SearchBar({ value, onChange, onSubmit, placeholder = 'Search for a movie...' }) {
  return (
    <form className="searchbar" role="search" onSubmit={(e) => { e.preventDefault(); onSubmit?.(); }}>
      <input type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} aria-label="Search movies" />
      <button className="btn" type="submit">Search</button>
    </form>
  );
}

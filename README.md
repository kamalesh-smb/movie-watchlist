# MovieWatchlist (MERN)

React + Vite frontend, Node/Express API, MongoDB (Mongoose), JWT auth, bcrypt password hashing.

## Requirements
- Node.js 18+
- MongoDB running locally (`mongodb://127.0.0.1:27017`) or a free MongoDB Atlas connection string

## Run (two terminals)

**1. Backend**
```
cd backend
npm install
npm run seed      # optional: adds 10 sample movies
npm run dev       # http://localhost:5000
```
Edit `backend/.env` first if you use Atlas (`MONGO_URI`) and set a long random `JWT_SECRET`.

**2. Frontend**
```
cd frontend
npm install
npm run dev       # http://localhost:5173
```
Open http://localhost:5173. The Vite dev server forwards `/api` calls to the backend.

## API
| Method | Route | Auth | Purpose |
|---|---|---|---|
| POST | /api/auth/register | no | create account |
| POST | /api/auth/login | no | log in, returns JWT |
| GET | /api/movies?search=&genre=&sort=&limit= | no | list/search movies |
| GET | /api/movies/:id | no | one movie |
| POST / PUT / DELETE | /api/movies(/:id) | yes | add / edit / delete movie |
| GET | /api/watchlist | yes | current user's watchlist |
| POST | /api/watchlist | yes | add `{ movieId }` |
| PUT | /api/watchlist/:id | yes | set `{ status: "watchlist" or "watched" }` |
| DELETE | /api/watchlist/:id | yes | remove |

## Notes
- Passwords use `bcryptjs` (same algorithm as `bcrypt`, no native build step).
- Watchlist queries always filter by the logged-in user's id, so lists stay private.
- Poster images are optional: paste an image URL in Add Movie, otherwise a colored title card is shown.
- Any logged-in user can edit/delete movies in this version (no admin role yet).

# Contributing & Local Development

Quick notes for contributors and automated agents working on this repo.

Run the app locally

- Start the frontend (Create React App) from the repository root:

```bash
npm install
npm start
```

 - Start the backend from the `backend/` directory:

```bash
cd backend
npm install
# create a .env file (or copy .env.example) with ATLAS_URI
# then start the server (recommended):
npm start        # runs `node server.js`
# or during development with auto-restart on file changes:
npm run dev      # runs `nodemon server.js` (devDependency)
```

Environment

- Backend expects a `.env` file in `backend/` with:

```ini
# backend/.env
ATLAS_URI=<your mongodb connection string>
# optional: PORT=4000
```

Patterns & tips

- Frontend uses class components in `src/components/*.component.js` and calls the backend at `http://localhost:4000` via `axios`.
- Mongoose model field names are authoritative. If you add a field to `backend/models/exercise.model.js`, update `backend/routes/exercises.js` and the frontend form components `src/components/create-exercise.component.js` and `src/components/edit-exercise.component.js`.
- The repo includes `nodemon` as a `devDependency` in `backend/package.json`. Use `npm run dev` to start the backend with automatic restarts on changes.

Debugging

- Backend logs DB connection and server port in `backend/server.js`.
- Check browser devtools network tab for failing `axios` calls.

If you need a sample `.env`, see `backend/.env.example`.

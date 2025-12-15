<!-- .github/copilot-instructions.md -->
# GitHub Copilot / Agent Instructions for this repository

This repository is a simple MERN example (client + backend) used as an Exercise Tracker. The goal of these instructions is to give AI coding agents the immediate, actionable context needed to make safe, small, and correct changes.

- **Big picture**: The frontend is a Create React App in the repository root (`src/`), and the backend is a minimal Express + Mongoose app in `backend/`. The frontend talks to the backend by making HTTP calls to `http://localhost:4000` (see `src/components/*` where `axios` is used directly).

- **Important files / entry points**:
  - `backend/server.js` — starts Express, loads `process.env.ATLAS_URI`, mounts routers and listens on port `4000`.
  - `backend/routes/exercises.js` and `backend/routes/users.js` — define REST endpoints used by the frontend (`/exercises`, `/users`).
  - `backend/models/exercise.model.js`, `backend/models/user.model.js` — Mongoose schemas; field names in these files are authoritative for API payloads.
  - `src/App.js` — React Router configuration for client routes.
  - `src/components/*.component.js` — UI logic, axios calls, and form handling. Look here for examples of how the client constructs requests.

- **Dev workflow / run commands** (what actually works in this repo):
  - Start frontend (CRA): `npm start` from the repository root.
  - Start backend: `cd backend && node server.js` (or `nodemon server.js` if you have nodemon installed).
  - The frontend expects the backend at `http://localhost:4000` (there is no CRA proxy configured). Components call endpoints like `http://localhost:4000/exercises/` explicitly.
  - Backend requires an environment variable `ATLAS_URI` for MongoDB. Place a `.env` file in `backend/` with `ATLAS_URI=<mongodb connection string>`.

- **Patterns & conventions specific to this project**:
  - Frontend uses React class components (not hooks) for forms and lists; state is internal to components. When editing or creating exercises the components send JSON bodies matching the Mongoose schema field names (`username`, `description`, `duration`, `date`).
  - Dates on the client are sent as ISO strings or parsed by `Date.parse()` in the server routes (see `backend/routes/exercises.js`). Prefer the client's current pattern: `date` as `yyyy-MM-dd` string.
  - REST routes follow this shape: `GET /exercises/`, `POST /exercises/add`, `GET /exercises/:id`, `POST /exercises/update/:id`, `DELETE /exercises/:id`.
  - Backend uses `express.json()` and `cors()`; changing client origin or ports will require updating CORS or the client calls.

- **Common change recipe examples** (concrete examples to follow):
  - Add a field to Exercise model: update `backend/models/exercise.model.js` (add schema property) -> update backend route handlers to read/write the new field -> update frontend forms in `src/components/create-exercise.component.js` and `edit-exercise.component.js` to collect and send the new field.
  - Fix a broken client API call: search for `http://localhost:4000` in `src/` to locate axios usages; adjust path to match `backend/routes/*.js` if necessary.

- **Testing & debugging hints**:
  - There are no backend unit tests in `backend/`. Frontend tests use CRA defaults (`npm test`).
  - Useful debug steps: run `node backend/server.js`, check console logs (server prints DB connection and port), open browser devtools to inspect axios requests/responses from client, and note `console.log` in `src/components/navbar.component.js` for a simple example of a component-side log.

- **Integration points / external dependencies**:
  - MongoDB Atlas (via `ATLAS_URI`) is required for runtime. The backend depends on `mongoose` and `mongodb` packages (see `backend/package.json`).
  - The client depends on `axios` (imported in components), `react-router-dom`, and Bootstrap (via import in `src/App.js`).

- **Safety / scope rules for automated agents**:
  - Make minimal, self-contained changes: modify a single component, route, or model at a time and run the app locally to verify behavior.
  - Do not change the app structure (moving frontend into `backend/` or vice versa) or run `eject` in CRA.
  - If adding endpoints, update both backend routes and the client components that call them.

If anything in these notes is unclear or you want more examples (e.g., a sample `.env`, nodemon setup, or an example PR that adds a model field), tell me which part to expand and I will iterate.

# MFlix Movie Viewer

A full-stack React application for viewing and searching movies from MongoDB's `sample_mflix` dataset.

The Express backend connects to MongoDB Atlas and exposes a movie-search API. The React frontend uses Axios and Bootstrap to display results.

## Features

- Search movies by title
- Display movie posters, titles, release years, and genres
- Responsive Bootstrap card layout
- MongoDB Atlas integration
- Configurable frontend and backend URLs

## Tech Stack

- React
- React Bootstrap and Bootstrap
- Axios
- Node.js and Express
- MongoDB and MongoDB Atlas

## Local Setup

### 1. Install dependencies

```powershell
cd C:\path\to\mflix-viewer
npm install
```

### 2. Configure environment variables

Create `.env` from `.env.example`:

```powershell
Copy-Item .env.example .env
```

Update `.env` with your MongoDB Atlas connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/sample_mflix?retryWrites=true&w=majority
PORT=5000
FRONTEND_URL=http://localhost:3000
REACT_APP_API_URL=http://localhost:5000
```

The `.env` file is ignored by Git and must not be committed.

### 3. Start the backend

```powershell
npm run start:server
```

The API runs at `http://localhost:5000`.

### 4. Start the frontend

In a separate terminal:

```powershell
npm start
```

The React app runs at `http://localhost:3000`.

## API

### Get movies

```text
GET /api/movies
```

Optional query parameter:

```text
GET /api/movies?search=<title>
```

The endpoint returns up to 20 matching movie documents from the MongoDB `movies` collection.

## Render Deployment

The frontend and backend are deployed as separate Render services.

- Frontend: https://mflix-viewer.onrender.com
- Backend: https://mflix-viewer-api.onrender.com

### Backend environment variables

Set these on the Render Web Service:

```env
MONGODB_URI=<your-atlas-uri>/sample_mflix?retryWrites=true&w=majority
PORT=10000
FRONTEND_URL=https://mflix-viewer.onrender.com
```

Use the start command:

```text
node server.js
```

### Frontend environment variable

Set this when building the Render Static Site:

```env
REACT_APP_API_URL=https://mflix-viewer-api.onrender.com
```

Build command:

```text
npm install
npm run build
```

Publish directory:

```text
build
```

In MongoDB Atlas, allow the backend to connect through Network Access by adding `0.0.0.0/0` or a narrowly scoped outbound IP allowlist.

## Scripts

- `npm start` - Start the React development server
- `npm run start:server` - Start the Express server
- `npm run build` - Create a production React build
- `npm test` - Run frontend tests

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

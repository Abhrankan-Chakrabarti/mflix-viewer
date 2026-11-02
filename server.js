// server.js
require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || true,
  })
);

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not set. Add it to .env.");
}

const client = new MongoClient(uri);

app.get("/api/movies", async (req, res) => {
  try {
    const search = req.query.search || "";
    const db = client.db("sample_mflix");
    const collection = db.collection("movies");

    const query = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const movies = await collection
      .find(query)
      .limit(20)
      .toArray();

    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

async function startServer() {
  await client.connect();
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Backend running on port ${port}`));
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

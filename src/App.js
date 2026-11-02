import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Form, Spinner } from "react-bootstrap";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch movies from backend API
  const fetchMovies = async (query = "") => {
    try {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const res = await axios.get(
        `${apiUrl}/api/movies?search=${encodeURIComponent(query)}`
      );
      setMovies(res.data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    fetchMovies(e.target.value);
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">🎬 MFlix Movie Viewer</h1>
      <Form.Control
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={handleSearchChange}
        className="mb-4"
      />
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row>
          {movies.map((movie) => (
            <Col key={movie._id} md={4} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={movie.poster || "https://via.placeholder.com/300x450"}
                  alt={movie.title}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>
                    Year: {movie.year} <br />
                    Genres: {movie.genres?.join(", ")}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default App;

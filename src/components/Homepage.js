import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Homepage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const API_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trendingResponse, popularResponse] = await Promise.all([
          fetch(`${API_URL}/trending/movie/week?api_key=${API_KEY}`),
          fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`),
        ]);

        const trendingData = await trendingResponse.json();
        const popularData = await popularResponse.json();

        if (trendingData.results) {
          setTrendingMovies(trendingData.results.slice(0, 8));
        }
        if (popularData.results) {
          setPopularMovies(popularData.results.slice(0, 8));
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setTrendingMovies([]);
        setPopularMovies([]);
      }
    };

    fetchMovies();

    const savedMovies = JSON.parse(localStorage.getItem("saved")) || [];
    setSavedMovies(savedMovies);
  }, [API_KEY, API_URL]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="homepage">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

          <section className="trending-section">
            <h2>Trending This Week</h2>
            <div className="movie-grid">
              {trendingMovies?.map((movie) => (
                <Link
                  to={`/movie/${movie.id}`}
                  key={movie.id}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="movie-card">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <h3>{movie.title}</h3>
                  </div>
                </Link>
              )) || <p>Loading trending movies...</p>}
            </div>
          </section>

          <section className="trending-section">
        <h2>Trending This Week</h2>
        <div className="movie-grid">
          {trendingMovies?.map(movie => (
            <Link to={`/movie/${movie.id}`} key={movie.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="movie-card">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
              </div>
            </Link>
          )) || <p>Loading trending movies...</p>}
        </div>
      </section>

      <section className="popular-section">
        <h2>Popular Movies</h2>
        <div className="movie-grid">
          {popularMovies?.map(movie => (
            <Link to={`/movie/${movie.id}`} key={movie.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="movie-card">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
              </div>
            </Link>
          )) || <p>Loading popular movies...</p>}
        </div>
      </section>
    </div>
  );
}

export default Homepage;

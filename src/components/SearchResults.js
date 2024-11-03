import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const query = searchParams.get("query");

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const API_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/search/movie`, {
          params: {
            api_key: API_KEY,
            query: query,
          },
        });
        setSearchResults(response.data.results);
      } catch (error) {
        console.error("Error searching movies:", error);
        setSearchResults([]);
      }
      setIsLoading(false);
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query, API_KEY]);

  const saveMovie = (movie) => {
    const existingSavedMovies = JSON.parse(localStorage.getItem("saved")) || [];
    const isAlreadySaved = existingSavedMovies.some(
      (savedMovie) => savedMovie.id === movie.id
    );

    if (!isAlreadySaved) {
      const updateSavedMovies = [...existingSavedMovies, movie];
      localStorage.setItem("saved", JSON.stringify(updateSavedMovies));
      alert(`${movie.title} har lagts till i din lista!`);
    } else {
      alert("Denna film finns redan i din lista");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="search-results-page">
      <h2>Search Results for "{query}"</h2>
      <div className="movie-grid">
        {searchResults.length > 0 ? (
          searchResults.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="movie-card">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "path-to-placeholder-image"
                  }
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    saveMovie(movie);
                  }}
                >
                  Save to List
                </button>
              </div>
            </Link>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;

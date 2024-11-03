import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const API_URL = 'https://api.themoviedb.org/3';

  const searchMovies = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.get(`${API_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: query,
        }
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div>
      <form onSubmit={searchMovies}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>

      <div className="movie-grid">
        {movies.map(movie => (
          <div 
            key={movie.id}
            className="movie-card"
            onClick={() => handleMovieClick(movie.id)}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
            <button onClick={() => {/* Add save functionality later */}}>
              Save to List
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch; 
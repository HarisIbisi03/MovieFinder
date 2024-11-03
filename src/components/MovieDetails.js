import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const API_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${API_URL}/movie/${id}?api_key=${API_KEY}`
        );
        const data = await response.json();
        console.log('Movie data:', data);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id, API_KEY]);

  const formatReleaseDate = (date) => {
    if (!date) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <div className="movie-details-content">
        <div className="movie-poster">
          {movie.poster_path && (
            <img 
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              alt={movie.title}
            />
          )}
        </div>
        <div className="movie-info">
          <h1 className="movie-title">{movie.title}</h1>
          <div className="movie-meta">
            <span>{formatReleaseDate(movie.release_date)}</span>
            <span>•</span>
            <span>{formatRuntime(movie.runtime)}</span>
            {movie.genres && movie.genres.length > 0 && (
              <>
                <span>•</span>
                <span>{movie.genres.map(genre => genre.name).join(', ')}</span>
              </>
            )}
          </div>
          <div className="movie-score">
            <span>⭐ {movie.vote_average ? `${movie.vote_average.toFixed(1)}/10` : 'N/A'}</span>
          </div>
          <h3>Overview</h3>
          <p className="movie-overview">{movie.overview || 'No overview available'}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
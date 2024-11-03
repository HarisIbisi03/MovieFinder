import React, { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const [savedMovies, setSavedMovies] = useState([]);

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const API_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${API_URL}/movie/${id}?api_key=${API_KEY}`
        );
        const data = await response.json();
        console.log("Movie data:", data);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const loadSavedMovies = () => {
      const existingSavedMovies =
        JSON.parse(localStorage.getItem("saved")) || [];
      setSavedMovies(existingSavedMovies);
    };

    loadSavedMovies();
    fetchMovieDetails();
  }, [id, API_KEY]);

  const saveMovie = (movie) => {
    const isAlreadySaved = savedMovies.some(
      (savedMovie) => savedMovie.id === movie.id
    );

    if (!isAlreadySaved) {
      const updateSavedMovies = [...savedMovies, movie];
      localStorage.setItem("saved", JSON.stringify(updateSavedMovies));
      setSavedMovies(updateSavedMovies);
      alert(`${movie.title} has been added to your list!`);
    } else {
      const updatedSavedMovies = savedMovies.filter(
        (savedMovie) => savedMovie.id !== movie.id
      );
      localStorage.setItem("saved", JSON.stringify(updatedSavedMovies));
      setSavedMovies(updatedSavedMovies);
      alert(`${movie.title} has been removed from your list!`);
    }
  };

  const isMovieSaved = (movieId) => {
    const existingSavedMovies = JSON.parse(localStorage.getItem("saved")) || [];
    return existingSavedMovies.some((savedMovie) => savedMovie.id === movieId);
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
      )}
      <div className="movie-info">
        <p>
          Release Year:{" "}
          {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
        </p>
        <p>Runtime: {movie.runtime ? `${movie.runtime} min` : "N/A"}</p>
        <p>Rating: {movie.vote_average ? `${movie.vote_average}/10` : "N/A"}</p>
        <p>{movie.overview || "No overview available"}</p>
      </div>
      <button className="save-movie-button" onClick={() => saveMovie(movie)}>
        {isMovieSaved(movie.id) ? "Remove from List" : "Save to List"}
      </button>
    </div>
  );
}

export default MovieDetails;

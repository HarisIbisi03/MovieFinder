import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieSearch from './MovieSearch';
import MovieDetails from './MovieDetails';
import '../App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Movie Finder</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<MovieSearch />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
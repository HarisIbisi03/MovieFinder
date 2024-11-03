import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import Homepage from './Homepage';
import '../App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Movie Finder</Link></h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
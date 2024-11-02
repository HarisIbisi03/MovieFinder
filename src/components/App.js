import React from 'react';
import MovieSearch from './MovieSearch';
import '../App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Finder</h1>
      </header>
      <main>
        <MovieSearch />
      </main>
    </div>
  );
}

export default App; 
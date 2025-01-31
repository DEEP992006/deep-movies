// SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Card from './components/Card';
import Navbar from './components/Navbar';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/movie/search?q=${encodeURIComponent(query)}`);
        setResults(response.data.movies);
        setError('');
      } catch (err) {
        setError('Failed to fetch results. Please try again.');
        setResults([]);
      }
      setIsLoading(false);
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8">
          Search Results for "{query}"
        </h1>

        {isLoading && (
          <div className="text-white text-center py-8">Loading...</div>
        )}

        {error && (
          <div className="text-red-500 text-center py-8">{error}</div>
        )}

        {!isLoading && !error && results.length === 0 && (
          <div className="text-gray-400 text-center py-8">
            No movies found matching your search.
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {results.map((movie) => (
            <div key={movie._id} className="flex flex-col">
              <Card
                img={movie.poster}
                movieId={movie._id}
                className="transform transition-transform duration-300 hover:scale-105"
              />
              <div className="mt-2 text-white text-sm font-medium truncate">
                {movie.title}
              </div>
              {movie.year && (
                <div className="text-gray-400 text-xs">{movie.year}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
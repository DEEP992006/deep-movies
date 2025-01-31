import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TrendCard from "./components/TrendCard"; // Assuming TrendCard is used for movie display

/**
 * SearchResults Component
 * Displays search results based on the query parameter in the URL.
 */
const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (query) {
      fetchMovies(query);
    }
  }, [query]);

  const fetchMovies = async (searchQuery) => {
    try {
        const response = await axios.get(`http://localhost:5000/movies/search?q=${searchQuery}`);
      setMovies(response.data.movies);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-white text-2xl font-bold mb-4">Search Results for "{query}"</h2>
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <TrendCard key={movie.id} {...movie} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No movies found.</p>
      )}
    </div>
  );
};

export default SearchResults;

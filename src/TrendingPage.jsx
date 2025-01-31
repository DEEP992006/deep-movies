import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TrendCard from "./components/TrendCard"; // Card component for displaying trending movies
import axios from "axios";

const TrendingPage = () => {
  // State to store trending movies
  const [TrendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    // Fetch the first 10 movies from the API
    axios
      .get("http://localhost:3000/movie/") // Same API as HomePage
      .then((res) => {
        const movies = res.data.moviesList
          .slice(0, 10) // Get only the first 10 movies
          .map((movie) => ({
            id: movie._id,
            poster: movie.poster, // Movie poster image
            title: movie.title, // Movie title
            rating: movie.rating, // Movie rating
          }));
        setTrendingMovies(movies); // Update state with fetched movies
      })
      .catch((err) => console.error(err.message)); // Handle errors
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation Bar */}
      <Navbar />

      {/* Compact Hero Section */}
      <div className="py-12 sm:py-16 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Trending Now
        </h1>
        <p className="text-lg sm:text-xl text-gray-300">
          Discover the most popular movies this week.
        </p>
      </div>

      {/* Trending Movies Grid */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {TrendingMovies.map((movie) => (
            <TrendCard
              key={movie.id} // Unique key for each movie
              img={movie.poster} // Poster image
              movieId={movie.id} // Movie ID for navigation
              title={movie.title} // Movie title
              rating={movie.rating} // Movie rating
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import TrendCard from "./components/TrendCard"; // Reuse your TrendCard component
import axios from "axios";

const categoryMap = {
  action: "Action",
  comedy: "Comedy",
  drama: "Drama",
  horror: "Horror",
  thriller: "Thriller",
  romance: "Romance",
  sciFi: "Sci-Fi",
  // Add more categories as needed
};

const CategoryPage = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const [categoryMovies, setCategoryMovies] = useState([]);
  const [categoryName, setCategoryName] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Map category ID to a readable name or use default
    setCategoryName(id);

    // Fetch movies for the given category ID
    axios
      .get(`http://localhost:3000/movie/category/${id}`)
      .then((res) => {
        setCategoryMovies(res.data.moviesList);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching category movies:", err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />

      {/* Category Header */}
      <div className="py-8 sm:py-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
          {categoryName}
        </h1>
        <p className="text-lg sm:text-xl text-gray-300">
          Explore the best movies in this category.
        </p>
      </div>

      {/* Movies Grid */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {loading ? (
          <p className="text-gray-300 text-center text-lg">Loading movies...</p>
        ) : categoryMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryMovies.map((movie) => (
              <TrendCard
                key={movie._id} // Ensure consistency with backend IDs
                img={movie.poster}
                movieId={movie._id}
                title={movie.title}
                rating={movie.rating}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-300 text-center text-lg">No movies found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

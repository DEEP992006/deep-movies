import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import axios from "axios";

const HomePage = () => {
  const [Movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/movie/")
      .then((res) => {
        console.log(res.data.moviesList[0]._id);
        
        // Extract movies with IDs and posters
        const movies = res.data.moviesList.map((movie) => ({
          id: movie._id, // Assuming the API response has an `id` field
          poster: movie.poster
        }));
        setMovies(movies); // Update state with the movie list
        // console.log(movies); // Log the array of movies
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {Movies.map((movie) => (
            <Card key={movie.id} img={movie.poster} movieId={movie.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

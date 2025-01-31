import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";

const MyUploadsPage = () => {
  const [movieIds, setMovieIds] = useState([]);
  const [uploadedMovies, setUploadedMovies] = useState([]);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  // Fetch the list of movie IDs uploaded by the user
  useEffect(() => {
    const fetchMovieIds = async () => {
      
        await axios.get(`http://localhost:3000/movie/mymovie/${email}`)
        .then((res) => {
         
         setUploadedMovies(res.data.userMovies)
        })
       
      }
    fetchMovieIds()
  }, []);
 useEffect(() => {
  console.log(uploadedMovies);
  
 }, [uploadedMovies])
 
  

  // Fetch movie details for each movie ID


  // Handle delete movie
  const handleDelete = async (movieId) => {
    try {
      await axios.delete(`http://localhost:3000/movie/${movieId}`);
      setUploadedMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieId));
    } catch (err) {
      console.error("Error deleting movie:", err.message);
    }
  };

  // Handle view movie
  const handleView = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">My Uploaded Movies</h1>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {uploadedMovies.length > 0 ? (
            uploadedMovies.map((movie) => (
              <div key={movie._id} className="group relative w-full bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Movie Poster */}
                <div className="aspect-video bg-gray-700 relative overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Hover Overlay with Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    {/* View Button */}
                    <button
                      onClick={() => handleView(movie._id)}
                      className="p-3 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(movie._id)}
                      className="p-3 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Movie Details */}
                <div className="p-3 bg-gray-900 text-white text-sm flex justify-between items-center">
                  <span className="font-semibold">{movie.title}</span>
                  <span className="text-yellow-400 font-semibold">⭐ {movie.rating}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-300 text-center col-span-full">You haven't uploaded any movies yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyUploadsPage;

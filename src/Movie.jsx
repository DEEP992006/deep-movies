import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Download, Play, Star, Clock, Calendar } from "lucide-react";

function Movie() {
  const { id } = useParams(); // ✅ Extract movie ID from URL params
  const [movie, setMovie] = useState(null); // ✅ State to store movie details
  const [isDownloading, setIsDownloading] = useState(false); // ✅ Track download state

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/movie/${id}`);
        setMovie(response.data.moviesList); // ⚠️ `moviesList` is likely an array, should be `moviesList[0]`
        console.log(moviesList); // ⚠️ `moviesList` is undefined, should be `response.data.moviesList`
        
      } catch (error) {
        console.error("Error fetching movie:", error); // ✅ Catch API errors
      }
    };
    fetchMovie();
  }, [id]); // ✅ Re-fetch movie if ID changes

  // Function to handle movie download
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      window.location.href = movie.downloadLink; // ✅ Redirect to download link
    } catch (error) {
      console.error("Download failed:", error); // ✅ Catch download errors
    }
    setIsDownloading(false);
  };

  // Function to handle trailer redirection
  const handleWatchTrailer = () => {
    if (movie.tailorLink) { // ⚠️ Typo: should be `trailerLink`, unless it's named `tailorLink` in API
      window.open(movie.tailorLink); // ✅ Open trailer in a new tab
    } else {
      alert("no tailor"); // ⚠️ Consider a better user-friendly message
    }
  };

  if (!movie) return <div className="min-h-screen bg-gray-900"></div>; // ✅ Show blank screen while loading

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-1 sm:pt-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* ✅ Movie Poster */}
          <div className="lg:w-1/3">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full rounded-xl shadow-2xl transform transition duration-500 hover:scale-105"
            />
          </div>

          {/* ✅ Movie Details */}
          <div className="lg:w-2/3 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {movie.title}
            </h1>

            {/* ✅ Metadata (Year, Duration, Rating) */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center bg-gray-700 px-3 py-1 rounded-lg">
                <Calendar className="h-5 w-5 mr-2 text-blue-400" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center bg-gray-700 px-3 py-1 rounded-lg">
                <Clock className="h-5 w-5 mr-2 text-blue-400" />
                <span>{movie.duration}</span>
              </div>
              <div className="flex items-center bg-gray-700 px-3 py-1 rounded-lg">
                <Star className="h-5 w-5 mr-2 text-blue-400" />
                <span>{movie.rating}/10</span>
              </div>
            </div>

            {/* ✅ Movie Description */}
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              {movie.description}
            </p>

            {/* ✅ Genre Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {movie.genre?.split(",").map((genre) => (
                <span
                  key={genre.trim()}
                  className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm"
                >
                  {genre.trim()}
                </span>
              ))}
            </div>

            {/* ✅ Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownload}
                disabled={isDownloading} // ✅ Disable while downloading
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all font-medium gap-2"
              >
                <Download className="h-5 w-5" />
                {isDownloading ? "Downloading..." : "Download Now"}
              </button>

              <button
                onClick={handleWatchTrailer}
                className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg transition-all font-medium gap-2"
              >
                <Play className="h-5 w-5" />
                Watch Trailer
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;

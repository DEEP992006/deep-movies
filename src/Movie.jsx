import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Download, Play, Star, Clock, Calendar } from "lucide-react";

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/movie/${id}`);
        setMovie(response.data.moviesList);
        console.log(moviesList);
        
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchMovie();
  }, [id]);

  // Function to handle movie download
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
         window.location.href = movie.downloadLink;
    } catch (error) {
      console.error("Download failed:", error);
    }
    setIsDownloading(false);
  };

  // Function to handle trailer redirection
  const handleWatchTrailer = () => {
  if(movie.tailorLink){
      window.open(movie.tailorLink);
  }
  else{
   alert("no tailor")
  }
  };

  if (!movie) return <div className="min-h-screen bg-gray-900"></div>;

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-1 sm:pt-1 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Poster Section */}
          <div className="lg:w-1/3">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full rounded-xl shadow-2xl transform transition duration-500 hover:scale-105"
            />
          </div>

          {/* Details Section */}
          <div className="lg:w-2/3 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {movie.title}
            </h1>

            {/* Metadata Row */}
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

            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              {movie.description}
            </p>

            {/* Genre Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {movie.genre?.split(",").map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm"
                >
                  {genre.trim()}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
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

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ img, movieId }) => {
  const [link, setLink] = useState("");
  const navigate = useNavigate(); // Use the hook at the top level of the component

  const download = async () => {
    try {
      // Fetch movie details dynamically
      const response = await axios.get(`http://localhost:3000/movie/download/${movieId}`);
      setLink(response.data.movie.downloadLink); // Update the link state with the movie poster URL
      
      // Navigate to the link once the state is updated
      if (response.data.movie.downloadLink) {
        window.location.href = response.data.movie.downloadLink;  // Assuming this is a valid path
      }
    } catch (err) {
      console.error("Error while downloading the movie:", err.message);
    }
  };
  const show = async () => {
  navigate(`/movie/${movieId}`)
  };
  return (
    <div className="group relative w-full bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="aspect-video bg-gray-700 relative overflow-hidden">
        <img
          src={img}
          alt="Movie Title"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button onClick={download} className="p-3 bg-white/10 rounded-full backdrop-blur-xs hover:bg-white/20 transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <button onClick={show} className="p-3 bg-white/10 rounded-full backdrop-blur-xs hover:bg-white/20 transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Minimal Metadata */}
    </div>
  );
};

export default Card;

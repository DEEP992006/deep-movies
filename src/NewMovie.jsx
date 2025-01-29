import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Upload, Loader } from "lucide-react";

const NewMovie = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      navigate("/login");
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const email = localStorage.getItem("email");
    const movieData = { email, ...data };
console.log(movieData);

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/movie/new", movieData);
      alert(response.data.message);
      reset();
    } catch (err) {
      const message = err.response?.data?.message || "An error occurred. Please try again.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-1 sm:pt-1">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Add New Movie
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Movie Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Movie Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title", { required: "Movie title is required" })}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-sm text-red-400 mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              {...register("description", { required: "Description is required" })}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            ></textarea>
            {errors.description && (
              <p className="text-sm text-red-400 mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Poster URL */}
          <div>
            <label htmlFor="poster" className="block text-sm font-medium text-gray-300 mb-2">
              Movie Poster (URL)
            </label>
            <input
              id="poster"
              type="text"
              {...register("poster", { required: "Movie poster is required" })}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.poster && (
              <p className="text-sm text-red-400 mt-1">{errors.poster.message}</p>
            )}
          </div>

          {/* Download Link */}
          <div>
            <label htmlFor="downloadLink" className="block text-sm font-medium text-gray-300 mb-2">
              Download Link
            </label>
            <input
              id="downloadLink"
              type="text"
              {...register("downloadLink", { required: "Download link is required" })}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.downloadLink && (
              <p className="text-sm text-red-400 mt-1">{errors.downloadLink.message}</p>
            )}
          </div>
           {/* Tailor Link */}
           <div>
            <label htmlFor="tailorLink" className="block text-sm font-medium text-gray-300 mb-2">
              Tailor Link
            </label>
            <input
              id="tailorLink"
              type="text"
              {...register("tailorLink", { required: "Tailor link is required" })}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.tailorLink && <p className="text-sm text-red-400 mt-1">{errors.tailorLink.message}</p>}
          </div>

          {/* Genre */}
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-2">
              Genre
            </label>
            <select
              id="genre"
              {...register("genre", { required: "Genre is required" })}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a genre</option>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Horror">Horror</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Thriller">Thriller</option>
            </select>
            {errors.genre && (
              <p className="text-sm text-red-400 mt-1">{errors.genre.message}</p>
            )}
          </div>

          {/* Year */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-2">
              Release Year
            </label>
            <input
              id="year"
              type="number"
              {...register("year", { required: "Release year is required" })}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.year && (
              <p className="text-sm text-red-400 mt-1">{errors.year.message}</p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-2">
              Duration (in minutes)
            </label>
            <input
              id="duration"
              type="number"
              {...register("duration", { required: "Duration is required" })}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.duration && (
              <p className="text-sm text-red-400 mt-1">{errors.duration.message}</p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-2">
              Rating (out of 10)
            </label>
            <input
              id="rating"
              type="number"
              step="0.1"
              {...register("rating", { required: "Rating is required" })}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.rating && (
              <p className="text-sm text-red-400 mt-1">{errors.rating.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all font-medium gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  Add Movie
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMovie;
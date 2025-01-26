import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/movie/", movieData);
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
    <div>
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Movie Title</label>
          <input
            id="title"
            type="text"
            {...register("title", { required: "Movie title is required" })}
            className="border-1"
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description", { required: "Description is required" })}
            className="border-1"
          ></textarea>
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div>
          <label htmlFor="poster">Movie Poster (URL)</label>
          <input
            id="poster"
            type="text"
            {...register("poster", { required: "Movie poster is required" })}
            className="border-1"
          />
          {errors.poster && <p>{errors.poster.message}</p>}
        </div>

        <div>
          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            {...register("genre", { required: "Genre is required" })}
            className="border-1"
          >
            <option value="">Select a genre</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
            <option value="Horror">Horror</option>
          </select>
          {errors.genre && <p>{errors.genre.message}</p>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Movie"}
        </button>
      </form>
    </div>
  );
};

export default NewMovie;

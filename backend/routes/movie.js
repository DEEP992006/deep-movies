const express = require("express");
const router = express.Router();
const Signup = require("../models/signup"); // Import Signup model
const Movie = require("../models/movies"); // Import Movie model

// Get all movies
router.get("/", async (req, res) => {
  try {
    let moviesList = await Movie.find(); // Fetch all movies from the database
    res.status(201).json({ message: "Movie added successfully", moviesList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a single movie by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let moviesList = await Movie.findById(id); // Fetch movie details by ID
    console.log(moviesList);
    res.status(201).json({ message: "Movie added successfully", moviesList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get movies by category (genre)
router.get("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let moviesList = await Movie.find({ genre: id }); // Fetch movies that belong to a specific genre
    res.status(200).json({ message: "Movies fetched successfully", moviesList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all movies uploaded by a specific user
router.get("/mymovie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let userMovies = await Movie.find({ email: id }); // Fetch movies uploaded by a specific user
    res.status(200).json({ message: "Movies fetched successfully", userMovies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get movie download link by ID
router.get("/download/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findOne({ _id: id }); // Find movie by ID
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ message: "Movie retrieved successfully", movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a new movie
router.post("/new", async (req, res) => {
  const { email, title, description, poster, genre, downloadLink, year, duration, rating, tailorLink } = req.body;

  try {
    const user = await Signup.findOne({ email }); // Find user by email
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newMovie = new Movie({
      title,
      description,
      poster,
      genre,
      downloadLink,
      tailorLink,
      year,
      duration,
      rating,
      user: user._id,
      email, // Associate the movie with the user
    });

    const savedMovie = await newMovie.save(); // Save movie to database

    user.movies.push(savedMovie._id); // Add movie reference to user's movies array
    await user.save();

    res.status(201).json({ message: "Movie added successfully", movie: savedMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a movie by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let moviesList = await Movie.findOneAndDelete({ _id: id }); // Delete movie by ID
    console.log(moviesList);
    res.status(201).json({ message: "Movie deleted successfully", moviesList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

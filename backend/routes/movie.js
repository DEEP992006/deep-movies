const express = require("express");
const router = express.Router();
const Signup = require("../models/signup"); // Import Signup model
const Movie = require("../models/movies"); // Import Movie model

router.get("/", async (req, res) => {
  try {
    // Find the user by email
   let moviesList = await Movie.find();
   res.status(201).json({ message: "Movie added successfully", moviesList});
    }
    
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    // Find the user by email
   let moviesList = await Movie.findById(id);
   res.status(201).json({ message: "Movie added successfully", moviesList});
    }
    
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/download/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the movie by its ID
    const movie = await Movie.findOne({ _id: id }); // Query should use an object with the field and value

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie retrieved successfully", movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/new", async (req, res) => {
  const { email, title, description, poster, genre,downloadLink,year, duration, rating, tailorLink, } = req.body;

  try {
    // Find the user by email
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new movie
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
      user: user._id, // Associate the movie with the user
    });

    // Save the movie to the database
    const savedMovie = await newMovie.save();

    // Add the movie ID to the user's movies array
    user.movies.push(savedMovie._id);
    await user.save();

    res.status(201).json({ message: "Movie added successfully", movie: savedMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

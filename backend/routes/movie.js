const express = require("express");
const router = express.Router();
const Signup = require("../models/signup"); // Import Signup model
const Movie = require("../models/movies"); // Import Movie model

router.post("/", async (req, res) => {
  const { email, title, description, poster, genre } = req.body;

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

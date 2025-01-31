const mongoose = require("mongoose");

// Define the movie schema
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },        // Movie title
  email: { type: String, required: true },        // User's email (who added the movie)
  description: { type: String, required: true },  // Movie description
  poster: { type: String, required: true },       // URL for the movie poster
  genre: { type: String, required: true },        // Movie genre
  downloadLink: { type: String, required: true }, // Download link for the movie
  tailorLink: { type: String, required: true },   // Trailer link
  year: { type: Number, required: true },         // Release year of the movie
  duration: { type: Number, required: true },     // Movie duration in minutes
  rating: { type: Number, required: true, min: 0, max: 10 }, // Movie rating (0-10)
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Signup", required: true }, // Reference to the user who added the movie
});

// Export the Movie model
module.exports = mongoose.model("Movie", movieSchema);

const mongoose = require("mongoose");

// Define the user signup schema
const signupSchema = new mongoose.Schema({
  email: { type: String, required: true }, // User's email (unique identifier)
  name: { type: String }, // User's name (optional)
  password: { type: String, required: true, minlength: 8 }, // User's password (minimum length: 8)
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }], // List of movies added by the user
});

// Export the Signup model
module.exports = mongoose.model("Signup", signupSchema);

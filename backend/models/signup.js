const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String },
  password: { type: String, required: true, minlength: 8 },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

module.exports = mongoose.model("Signup", signupSchema);

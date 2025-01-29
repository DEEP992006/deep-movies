const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  poster: { type: String, required: true },
  genre: { type: String, required: true },
  downloadLink: { type: String, required: true },
  tailorLink:{ type: String, required: true },
  year: { type: Number, required: true },
  duration: { type: Number, required: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Signup", required: true },
});

module.exports = mongoose.model("Movie", movieSchema);

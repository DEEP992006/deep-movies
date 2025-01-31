const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const signupRoutes = require("./routes/signup"); // Import routes
const loginRoutes = require("./routes/login")
const profileRoutes = require("./routes/profile")
const movieRoutes = require("./routes/movie")
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb+srv://biptisurati:deep09@deep.xycm9.mongodb.net/movies?retryWrites=true&w=majority&appName=deep", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/signup", signupRoutes);
app.use("/api/login", loginRoutes);
app.use("/profile", profileRoutes);
app.use("/movie",movieRoutes)

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

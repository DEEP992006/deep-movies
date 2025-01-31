require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const notificationRoutes = require('./routes/notifications');
const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const profileRoutes = require("./routes/profile");
const movieRoutes = require("./routes/movie");

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// MongoDB connection using .env variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/notifications", notificationRoutes);
app.use("/api/signup", signupRoutes);
app.use("/api/login", loginRoutes);
app.use("/profile", profileRoutes);
app.use("/movie", movieRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

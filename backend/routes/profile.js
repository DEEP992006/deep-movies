const express = require("express");
const router = express.Router();
const Signup = require("../models/signup"); // Import the model

// GET user profile by email
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const userdata = await Signup.findOne({ email: email });

    if (!userdata) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(userdata);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE (PUT) user profile by email
router.put("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { name, password } = req.body;

    // Find and update user
    const updatedUser = await Signup.findOneAndUpdate(
      { email: email },  // Find by email
      { name: name, password: password }, // Update name and password
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Signup = require("../models/signup"); // Import the model

// Signup POST route
router.get("/:email", async (req, res) => {
  const { email} = req.params;
  let userdata = await Signup.findOne({email: email});
  res.json(userdata)
});

module.exports = router;


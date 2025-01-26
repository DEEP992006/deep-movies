const express = require("express");
const router = express.Router();
const Signup = require("../models/signup"); // Import the model

// Signup POST route
router.post("/", async (req, res) => {
  const { email, name, password } = req.body;
  let exist = await Signup.findOne({email: email});
  if(exist){
    res.status(400).json({ message: "aleaready exist"});
    
  }
  else{
    const newUser = new Signup({
      email,
      name,
      password,
    });
    await newUser.save();
    res.status(201).json({ message: "Signup successful!", user: newUser });
    
 
  }
  
   
});

module.exports = router;


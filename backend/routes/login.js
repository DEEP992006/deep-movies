const express = require("express");
const router = express.Router();
const Signup = require("../models/signup"); // Import the model

// Login POST route
router.post("/", async (req, res) => {
  const { email, password } = req.body;
console.log(email+password)

     let user = await Signup.findOne({email: email})
     
     if(!user){
        res.status(400).json({ message: "user not found"});
     }
     else if(user.password === password){
        res.status(201).json({ message: "login success"});
     }
});

module.exports = router;

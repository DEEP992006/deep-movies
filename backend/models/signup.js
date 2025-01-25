const mongoose = require("mongoose");


const signupSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
    
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  movies: [
    {
      id: {
        type: String,
        
      },
    },
  ],
});

const Signup = mongoose.model("Signup", signupSchema);
module.exports = Signup;

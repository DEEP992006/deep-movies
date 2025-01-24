import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Movie from './Movie'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'


import About from './About'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function App() {


  return (
    <Router>
      <div>
        <nav>


        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </div>
    </Router>

  )
}

export default App

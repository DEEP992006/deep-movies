import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import About from './About';
import Login from './Login';
import Signup from './Signup';
import Movie from './Movie';
import Profile from "./Profile"

function App() {
  return (
    <Router>
      <div>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

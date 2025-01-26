import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import About from './newMovie';
import Login from './Login';
import Signup from './Signup';
import Movie from './Movie';
import Profile from "./Profile"
import Navbar from "./components/Navbar";
import NewMovie from "./NewMovie";
function App() {
  return (
    <Router>
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-full h-[100vh]">
        <Navbar  />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<NewMovie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

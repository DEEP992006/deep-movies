import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Movie from './Movie';
import Profile from "./Profile"
import Navbar from "./components/Navbar";
import NewMovie from "./NewMovie";
function App() {
  return (
    <Router>
      <div className="w-full h-full ">
        <Navbar />
        <div className="pt-16"> {/* Offset for fixed navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<NewMovie />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/movie/:id" element={<Movie />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

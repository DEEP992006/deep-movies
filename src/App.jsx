import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Movie from './Movie';
import Profile from "./Profile"
import Navbar from "./components/Navbar";
import NewMovie from "./NewMovie";
import TrendingPage from "./TrendingPage";
import ScrollToTop from "./components/ScrollToTop";
import CategoryPage from "./CategoryPage";
import MyUploadsPage from "./MyUploadsPage";
import SearchResults from "./ SearchResults";

function App() {
  
  return (
    <Router>
      <ScrollToTop />
      <div className="w-full h-full ">
        <Navbar />
        <div className="pt-16"> {/* Offset for fixed navbar */}
         
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/upload" element={<NewMovie />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/uploads" element={<MyUploadsPage />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/category/:id" element={<CategoryPage />} />;
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { DynamicIcon } from 'lucide-react/dynamic';
import closeIcon from "../assets/close.png"
import menuIcon from "../assets/menu (1).png"

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    return (
      <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 shadow-md h-16">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="text-white text-2xl font-bold flex items-center">
            🎬 MovieMate
          </Link>
  
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-gray-200">Home</Link>
            <Link to="/profile" className="text-white hover:text-gray-200">Profile</Link>
            <Link to="/about" className="text-white hover:text-gray-200">About</Link>
            <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
            <Link to="/signup" className="text-white hover:text-gray-200">Signup</Link>
          </div>
  
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <img src={closeIcon} className="size-5.5" alt="close" /> : <img src={menuIcon} className="size-7" alt="menu" />}
          </button>
  
          {/* Mobile Navigation Links */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 w-full bg-blue-500 shadow-md md:hidden">
              <div className="flex flex-col items-center space-y-4 py-4">
                <Link
                  to="/"
                  className="text-white hover:text-gray-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/profile"
                  className="text-white hover:text-gray-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/about"
                  className="text-white hover:text-gray-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white hover:text-gray-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Signup
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }
  
  export default Navbar;
  
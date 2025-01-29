import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Bell, Upload, Menu, X, Film, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  // Check local storage for user email on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('email');
    setUserEmail(null);
    navigate('/');
  };

  // Close menus when clicking outside
  useEffect(() => {
    const closeMenus = (e) => {
      if (!e.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
      if (!e.target.closest('.search-container')) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('click', closeMenus);
    return () => document.removeEventListener('click', closeMenus);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-800 shadow-md border-b border-gray-700 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo and Navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-white text-2xl font-bold">Movie</span>
              <span className="text-blue-500 text-2xl font-bold ml-1">Hub</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center ml-8 space-x-6">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/trending" className="text-gray-300 hover:text-white transition-colors">
                Trending
              </Link>
              <div className="relative group">
                <button className="text-gray-300 hover:text-white transition-colors">
                  Categories
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                  <div className="py-1">
                    {['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'].map((category) => (
                      <Link
                        key={category}
                        to={`/category/${category.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Section - Search Bar */}
          <div className="hidden md:flex flex-1 justify-center max-w-md px-4">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>

          {/* Right Section - User Actions */}
          <div className="flex items-center space-x-4">
            {userEmail ? (
              <>
                {/* Notifications */}
                <button className="p-2 text-gray-300 hover:text-white relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                {/* Upload Movie */}
                <Link
                  to="/upload"
                  className="hidden md:flex items-center text-gray-300 hover:text-white"
                >
                  <Upload className="h-5 w-5 mr-1" />
                  <span>Upload</span>
                </Link>

                {/* User Menu */}
                <div className="relative user-menu">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center text-gray-300 hover:text-white"
                  >
                    <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
                          {userEmail}
                        </div>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/uploads"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                          My Uploads
                        </Link>
                        <Link
                          to="/watchlist"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                          Watchlist
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium"
                >
                  Signup
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Home
              </Link>
              <Link
                to="/trending"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Trending
              </Link>
              {userEmail && (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/uploads"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    My Uploads
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </>
              )}
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Search movies..."
                  className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
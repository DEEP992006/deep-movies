import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Bell, Upload, Menu, X, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false); // Toggle categories open/close
  const [userEmail, setUserEmail] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsOpen(false); // Close mobile menu
    }
  };

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
    setIsOpen(false); // Close mobile menu
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
      if (!e.target.closest('.categories-menu')) {
        setIsCategoriesOpen(false); // Close categories when clicking outside
      }
    };
    document.addEventListener('click', closeMenus);
    return () => document.removeEventListener('click', closeMenus);
  }, []);

  // Handle categories dropdown click
  const handleCategoriesClick = (e) => {
    e.stopPropagation(); // Stop event propagation
    setIsCategoriesOpen(!isCategoriesOpen); // Toggle category menu on click
  };

  // Close mobile menu after navigation
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-800 shadow-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo and Navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
              <span className="text-white text-2xl font-bold">Movie</span>
              <span className="text-blue-500 text-2xl font-bold ml-1">Hub</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center ml-8 space-x-6">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors" onClick={closeMobileMenu}>
                Home
              </Link>
              <Link to="/trending" className="text-gray-300 hover:text-white transition-colors" onClick={closeMobileMenu}>
                Trending
              </Link>
              <div className="relative categories-menu">
                <button
                  onClick={handleCategoriesClick} // Toggle categories on click
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Categories
                </button>
                {isCategoriesOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'].map((category) => (
                        <Link
                          key={category}
                          to={`/category/${category}`}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                          onClick={() => {
                            closeMobileMenu(); // Close the mobile menu
                            setIsCategoriesOpen(false); // Close the categories dropdown
                          }}
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 justify-center max-w-md px-4">
            <form onSubmit={handleSearch} className="w-full relative search-container">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </form>
          </div>

          {/* Right Section - User Actions */}
          <div className="flex items-center space-x-4">
            {userEmail ? (
              <>
                {/* Notifications */}
                <button
                  className="p-2 text-gray-300 hover:text-white relative"
                  onClick={() => {
                    navigate('/notifications');
                    closeMobileMenu();
                  }}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                {/* Upload Movie */}
                <Link
                  to="/upload"
                  className="hidden md:flex items-center text-gray-300 hover:text-white"
                  onClick={closeMobileMenu}
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
                          onClick={closeMobileMenu}
                        >
                          Profile
                        </Link>
                        <Link
                          to="/uploads"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                          onClick={closeMobileMenu}
                        >
                          My Uploads
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
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium"
                  onClick={closeMobileMenu}
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
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/trending"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={closeMobileMenu}
              >
                Trending
              </Link>

              {/* Categories in Mobile Menu */}
              <div className="relative">
                <div
                  onClick={handleCategoriesClick}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer"
                >
                  Categories
                </div>
                {isCategoriesOpen && (
                  <div className="pl-4">
                    {['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'].map((category) => (
                      <Link
                        key={category}
                        to={`/category/${category}`}
                        className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                        onClick={(e) => {
                          e.stopPropagation(); // Stop event propagation
                          closeMobileMenu(); // Close the mobile menu
                          setIsCategoriesOpen(false); // Close the categories dropdown
                        }}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {userEmail && (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    onClick={closeMobileMenu}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/uploads"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    onClick={closeMobileMenu}
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
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

/**
 * SearchBar Component
 * Allows users to search for movies and navigate to the results page.
 */
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Handle search input change
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle search submit (Enter key or button click)
  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (query.trim()) {
        navigate(`/search?q=${query}`);
      }
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleSearch} // Detect Enter key
        placeholder="Search movies..."
        className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={handleSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SearchBar;

import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import searchIcon from "../assets/search.webp";
function SearchBar({ placeholder = "Search" }) {
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log("Searching:", e.target.value);
  };
  const closeSearch = () => {
    setIsSearchOpen(false);
    setQuery("");
  };
  if (!isSearchOpen) {
    return (
      <div className="md:hidden flex items-center">
        <button
        onClick={() => setIsSearchOpen(true)}
        aria-label="Open search"
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <FiSearch size={20} className="text-gray-800" />
        </button>
      </div>
    );
  }
  if (isSearchOpen) {
    return (
      <div className="md:hidden fixed inset-0 z-50 bg-white flex flex-col">
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <div className="relative w-full">
            <img
              src={searchIcon}
              loading="lazy"
              alt="Search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            />
            <label htmlFor="search-input" className="sr-only">Search</label>
            <input
            id="search-input"
            type="text"
            value={query}
            onChange={handleChange}
            placeholder={placeholder}
              autoFocus
              className="pl-12 pr-4 py-2 w-full rounded-[6px] border border-[#E3EDFC] focus:outline-none focus:ring-1 focus:ring-[#E3EDFC]"
            />
          </div>
          <button
          onClick={closeSearch}
          aria-label="Close search"
            className="p-2 hover:bg-gray-100 rounded-lg transition flex-shrink-0"
          >
            <FiX size={20} className="text-gray-800" />
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="hidden md:block relative w-full max-w-[450px] pl-25">
      <img
        src={searchIcon}
        loading="lazy"
        alt="Search"
        className="absolute left-30 top-1/2 transform -translate-y-1/2 w-4 h-4"
      />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-12 pr-4 py-[18px] w-full max-w-[320px] h-[45px] rounded-[6px] border border-[#E3EDFC] focus:outline-none focus:ring-1 focus:ring-[#E3EDFC]"
      />
    </div>
  );
}
export default SearchBar;
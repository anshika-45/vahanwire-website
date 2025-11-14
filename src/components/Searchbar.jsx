
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/SearchIcon.svg";

function SearchBar({ placeholder = "Search..." }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const pages = {
    home: "/",
    about: "/about-us",
    amc: "/my-account?view=amc",
    profile: "/my-account?view=profile",
    vehicle: "/my-account?view=vehicles",
    contact: "/contact-us",
    mechanic: "/mechanic",
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const regex = new RegExp(value, "i");
      const matched = Object.keys(pages).filter((page) => regex.test(page));

      if (matched.length > 0) {
        setSuggestions(matched);
      } else {
        setSuggestions(["__no_match__"]);
      }
    } catch {
      setSuggestions(["__no_match__"]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      e.preventDefault();

      const lowerQuery = query.toLowerCase();
      if (pages[lowerQuery]) {
        navigate(pages[lowerQuery]);
      }
      //  else {
      //   navigate(`/search?query=${encodeURIComponent(query)}`);
      // }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion === "__no_match__") return;

    navigate(pages[suggestion]);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <div className="hidden md:block relative max-w-[500px]">
        <img
          src={searchIcon}
          loading="lazy"
          alt=""
          width="16"
          height="16"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
        />
        <label htmlFor="search-input" className="sr-only">
          Search
        </label>

        <input
          id="search-input"
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10 pr-6 py-2.5 w-full rounded-[6px] border border-[#E3EDFC] focus:outline-none focus:ring-1 focus:ring-[#E3EDFC]"
        />
      </div>

      {/* 🔽 Suggestion Dropdown */}
      {query.trim() !== "" && suggestions.length > 0 && (
        <div className="absolute bg-white border border-[#E3EDFC] rounded-md mt-1 w-full shadow-sm z-20 hidden md:block">
          {suggestions.map((item, index) =>
            item === "__no_match__" ? (
              <div
                key={index}
                className="px-4 py-2 text-gray-500 cursor-default"
              >
                No matching pages found
              </div>
            ) : (
              <div
                key={index}
                onClick={() => handleSuggestionClick(item)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {item}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

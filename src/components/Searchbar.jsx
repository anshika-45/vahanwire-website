import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/search.webp";

function SearchBar({ placeholder = "Search..." }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      e.preventDefault();

      const pages = {
        home: "/",
        about: "/about",
        amc: "/my-account?view=amc",
        profile: "/my-account?view=profile",
        vehicle: "my-account?view=vehicles",
      };

      const lowerQuery = query.toLowerCase();
      if (pages[lowerQuery]) {
        navigate(pages[lowerQuery]);
      } else {
        navigate(`/search?query=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <div role="search" className="">
      <div className="hidden md:block relative">
        <img
          src={searchIcon}
          loading="lazy"
          alt=""
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
    </div>
  );
}

export default SearchBar;

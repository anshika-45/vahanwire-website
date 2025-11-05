import React, { useState } from "react";
import searchIcon from "../assets/search.webp";
function SearchBar({ placeholder = "Search" }) {
const [query, setQuery] = useState("");
const handleChange = (e) => {
setQuery(e.target.value);
};

return (
<div className="relative w-full max-w-[300px]">
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
  className="pl-10 pr-4 py-2 w-full rounded-[6px] border border-[#E3EDFC] focus:outline-none focus:ring-1 focus:ring-[#E3EDFC]"
  />
  </div>
  );
}
export default SearchBar;
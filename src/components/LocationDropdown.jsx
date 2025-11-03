import React, { useState } from "react";
import locationIcon from "../assets/location-pin.webp";
import dropdownIcon from "../assets/down-arrow.webp";
function LocationDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select Location");
  const locations = [
    "Noida Sec 15",
    "Noida Sec 62",
    "Delhi CP",
    "Gurgaon MG Road",
  ];
  return (
    <div className="relative inline-block text-left pl-4 sm:pl-8 md:pl-50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-32 sm:w-40 md:w-[220px] h-10 md:h-[45px] bg-white text-black px-3 md:pl-[20px] md:pr-4 gap-2 md:gap-[20px] rounded-[6px] border border-[#E3EDFC] focus:outline-none focus:ring-1 focus:ring-[#E3EDFC] text-xs md:text-base"
      >
        <div className="flex items-center gap-2 md:gap-[10px]">
          <img src={locationIcon} alt="location" loading="lazy" className="w-4 sm:w-5 h-4 sm:h-5" />
          <span className="truncate">{selected}</span>
        </div>
        <img
          src={dropdownIcon}
          size={15}
          loading="lazy"
          alt="locationDropdown"
          className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0"
        />
      </button>
      {open && (
        <ul className="absolute mt-1 w-32 sm:w-40 md:w-[349px] bg-white border rounded shadow-lg z-10">
          {locations.map((location, index) => (
            <li
              key={index}
              className="px-3 md:px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 md:gap-[10px] text-xs md:text-base"
              onClick={() => {
                setSelected(location);
                setOpen(false);
              }}
            >
              <img loading="lazy" src={locationIcon} alt="location" className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default LocationDropdown;
import React, { useState } from "react";
import locationIcon from "../assets/location-pin.webp";
import dropdownIcon from "../assets/down-arrow.webp";
import { SearchIcon } from "lucide-react";
function LocationDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select Location");
  const locations = [
    "Noida Sec 15",
    "Noida Sec 62",
    "Delhi CP",
    "Gurgaon MG Road",
  ];
  const handleClick = () => {
    setOpen(!open);
  };
  const handleLocationClick = (e, index) => {
    const selectedLocation = locations[index];
    setSelected(selectedLocation);
    setOpen(false);
  };

  return (
    <div className="relative">
      <div
        id="webScreen"
        className="hidden md:block border text-sm min-w-[250px] py-2 px-7 rounded-[6px] border-[#E3EDFC] focus:outline-none focus:ring-1 focus:ring-[#E3EDFC]"
      >
        <div className=" absolute left-0 top-1/2 -translate-y-1/2 p-1 ">
          <img className="w-5 h-5 object-contain" src={locationIcon} alt="" />
        </div>
        <span className="border-b-2" onClick={handleClick}>
          {selected}
        </span>
        <div
          role="button"
          id="dropdownIcon"
          onClick={handleClick}
          className="absolute z-50 right-0 top-1/2 -translate-y-1/2 p-1"
        >
          <img className="w-5 h-5" src={dropdownIcon} alt="" />
        </div>
      </div>
      <div id="mobileScreen" className="md:hidden block">
        <div onClick={handleClick} role="button" className="leading-4">
          {selected === "Select Location" ? (
            <img className="w-5 h-5 object-contain" src={locationIcon} alt="" />
          ) : (
            <>
              <span className="text-[12px] px-1 leading-3 border-b flex items-center">
                {" "}
                <img
                  className="w-4 h-4 object-contain"
                  src={locationIcon}
                  alt=""
                />
                {selected}
              </span>
            </>
          )}
        </div>
      </div>
      <section id="locationMenu">
        {open && (
          <ul className="animation absolute top-full min-w-[250px] md:left-0 md:right-0 md:translate-x-0 left-1/2 -translate-x-1/2 z-50 bg-white rounded-b-2xl">
            {locations.map((location, index) => {
              return (
                <>
                  <li
                    onClick={(e) => {
                      handleLocationClick(e, index);
                    }}
                    className="px-3 py-1 border-b-[0.5px] border-gray-300"
                    key={index}
                  >
                    {location}
                  </li>
                </>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
export default LocationDropdown;

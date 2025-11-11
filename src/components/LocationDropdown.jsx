import React, { useState, useEffect, useCallback } from "react";
import locationIcon from "../assets/location-pin.webp";
import dropdownIcon from "../assets/down-arrow.webp";
import { SearchIcon } from "lucide-react";
import { getCityFromCoords } from "../api/authApi";

const LocationDropdown = ({ onLocationSelect }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select Location");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const locations = [
    "Noida Sec 15",
    "Noida Sec 62",
    "Delhi CP",
    "Gurgaon MG Road",
  ];

  const getShortAddress = (address) => {
    const parts = address.split(",");
    if (parts.length >= 2) {
      return `${parts[0].trim()}, ${parts[1].trim()}`;
    }
    return address.length > 30 ? address.substring(0, 30) + "..." : address;
  };

  const getCurrentLocation = useCallback(() => {
    setLoading(true);
    setError(null);
    setOpen(false);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getCityFromCoords(latitude, longitude);

          if (data.success) {
            const shortAddress = getShortAddress(data.address);
            setSelected(shortAddress);
            const locationData = {
              address: data.address,
              shortAddress: shortAddress,
              city: data.city,
              coordinates: {
                lat: latitude,
                lon: longitude,
              },
            };
            setCurrentLocation(locationData);

            if (onLocationSelect) {
              onLocationSelect(locationData);
            }
          }
        } catch (error) {
          console.error("Error fetching city:", error);
          setError("Failed to fetch location");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setError("Failed to get current location");
        setLoading(false);
      }
    );
  }, [onLocationSelect]);

  const handleClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleLocationClick = useCallback(
    (location) => {
      setSelected(location);
      setOpen(false);

      if (onLocationSelect) {
        onLocationSelect({
          address: location,
          city: location,
          coordinates: null,
        });
      }
    },
    [onLocationSelect]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && !event.target.closest("#locationDropdown")) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div id="locationDropdown" className="relative">
      <div
        id="webScreen"
        className="hidden md:flex items-center border text-sm min-w-[200px] max-w-[250px] py-2 px-3 rounded-[6px] border-gray-300 bg-white cursor-pointer hover:border-gray-400 transition-colors"
        onClick={handleClick}
      >
        <div className="flex-shrink-0 mr-2">
          <img className="w-5 h-5 object-contain" src={locationIcon} alt="" />
        </div>
        <span className="flex-1 truncate text-sm font-medium">
          {loading ? "Detecting..." : selected}
        </span>
        <div className="flex-shrink-0 ml-2">
          <img
            className={`w-4 h-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            src={dropdownIcon}
            alt=""
          />
        </div>
      </div>

      <div id="mobileScreen" className="md:hidden block">
        <div onClick={handleClick} role="button" className="flex items-center">
          {selected === "Select Location" ? (
            <img className="w-5 h-5 object-contain" src={locationIcon} alt="" />
          ) : (
            <span className="text-[12px] px-1 leading-4 border-b-2 border-black flex items-center gap-1 font-medium max-w-[120px] truncate">
              <img
                className="w-4 h-4 object-contain flex-shrink-0"
                src={locationIcon}
                alt=""
              />
              {loading ? "Detecting..." : selected}
            </span>
          )}
        </div>
      </div>

      <section id="locationMenu">
        {open && (
          <div className="absolute top-[calc(100%+4px)] left-0 min-w-[250px] z-50 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-fadeIn">
            <div className="p-2 border-b border-gray-200 bg-gray-50">
              <button
                onClick={getCurrentLocation}
                disabled={loading}
                className="w-full px-3 py-2 text-sm font-medium text-left hover:bg-white rounded-md flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SearchIcon className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700 text-sm">
                  {loading ? "Detecting..." : "Use Current Location"}
                </span>
              </button>
            </div>

            {error && (
              <div className="px-3 py-2 text-xs text-red-600 bg-red-50 border-b border-red-100">
                {error}
              </div>
            )}

            <ul className="max-h-[280px] overflow-y-auto">
              {locations.map((location, index) => (
                <li
                  key={index}
                  onClick={() => handleLocationClick(location)}
                  className="px-3 py-2.5 border-b border-gray-100 hover:bg-gray-50 cursor-pointer text-sm font-medium text-gray-800 transition-colors last:border-b-0"
                >
                  {location}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LocationDropdown;
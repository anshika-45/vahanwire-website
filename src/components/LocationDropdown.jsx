import React, { useState, useEffect, useCallback } from "react";
import locationIcon from "../assets/LocationIcon.svg";
import dropdownIcon from "../assets/down-arrow.svg";
import { getActiveCities, getMyProfile, updateCity } from "../api/authApi";

const LocationDropdown = ({ onLocationSelect }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select Location");
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    const interval = setInterval(checkToken, 1000);

    window.addEventListener("storage", checkToken);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      initializeLocation();
    } else {
      setSelected("Select Location");
      setSelectedCityId(null);
      setCities([]);
    }
  }, [isLoggedIn]);

  const initializeLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [citiesResponse, profileResponse] = await Promise.all([
        getActiveCities(),
        getMyProfile()
      ]);

      if (citiesResponse.data.success) {
        const cityList = citiesResponse.data.data || [];
        setCities(cityList);

        const userData = profileResponse.data;
        const userCity = cityList.find(
          (c) => c._id === userData?.selectedCity
        );

        if (userCity) {
          setSelected(userCity.displayName);
          setSelectedCityId(userCity._id);
          if (onLocationSelect) onLocationSelect(userCity);
        } else if (cityList.length > 0) {
          await setDefaultCity(cityList);
        }
      } else {
        setError("Failed to load active cities");
      }
    } catch (error) {
      console.error("Error initializing location:", error);
      setError("Failed to load cities");
    } finally {
      setLoading(false);
    }
  }, [onLocationSelect]);

  const setDefaultCity = async (cityList) => {
    const firstCity = cityList[0];
    if (!firstCity) return;

    setSelected(firstCity.displayName);
    setSelectedCityId(firstCity._id);

    try {
      await updateCity({ cityId: firstCity._id });
      console.log("Default city saved:", firstCity.displayName);
    } catch (error) {
      console.error("Error saving default city:", error);
    }

    if (onLocationSelect) onLocationSelect(firstCity);
  };

  const handleClick = () => setOpen((prev) => !prev);

  const handleLocationClick = async (city) => {
    setSelected(city.displayName);
    setSelectedCityId(city._id);
    setOpen(false);

    try {
      const response = await updateCity({ cityId: city._id });
      if (response.success) {
        console.log("City updated successfully:", city.displayName);
      }
    } catch (error) {
      console.error("Error updating user city:", error);
    }

    if (onLocationSelect) onLocationSelect(city);
  };

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
        className="hidden md:flex items-center border text-sm min-w-[200px] max-w-[250px] py-3 px-3 rounded-[6px] border-[#E3EDFC] bg-white cursor-pointer transition-colors"
        onClick={isLoggedIn ? handleClick : undefined}
      >
        <div className="flex-shrink-0 mr-2">
          <img className="w-5 h-5 object-contain" src={locationIcon} alt="location" />
        </div>
        <span className="flex-1 truncate text-sm font-medium">
          {loading ? "Loading..." : selected}
        </span>
        {isLoggedIn && (
          <div className="flex-shrink-0 ml-2">
            <img
              className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
              src={dropdownIcon}
              alt="dropdown"
            />
          </div>
        )}
      </div>

      <div id="mobileScreen" className="md:hidden block">
        <div
          onClick={isLoggedIn ? handleClick : undefined}
          role="button"
          className="flex items-center"
        >
          {selected === "Select Location" ? (
            <img className="w-5 h-5 object-contain" src={locationIcon} alt="location" />
          ) : (
            <span className="text-[12px] px-1 leading-4 border-b-2 border-black flex items-center gap-1 font-medium max-w-[120px] truncate">
              <img className="w-4 h-4 object-contain flex-shrink-0" src={locationIcon} alt="" />
              {loading ? "Loading..." : selected}
            </span>
          )}
        </div>
      </div>

      {open && isLoggedIn && (
        <div className="absolute top-[calc(100%+4px)] left-0 min-w-[250px] z-50 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-fadeIn">
          {error && (
            <div className="px-3 py-2 text-xs text-red-600 bg-red-50 border-b border-red-100">
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="px-3 py-4 text-center text-sm text-gray-500">
              Loading cities...
            </div>
          ) : cities.length === 0 ? (
            <div className="px-3 py-4 text-center text-sm text-gray-500">
              No cities available
            </div>
          ) : (
            <ul className="max-h-[280px] overflow-y-auto">
              {cities.map((city) => (
                <li
                  key={city._id}
                  onClick={() => handleLocationClick(city)}
                  className={`px-3 py-2.5 border-b border-gray-100 hover:bg-gray-50 cursor-pointer text-sm font-medium transition-colors last:border-b-0 ${
                    selectedCityId === city._id
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-800"
                  }`}
                >
                  {city.displayName}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

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

import React, { useState, useEffect, useCallback } from "react";
import locationIcon from "../assets/LocationIcon.svg";
import dropdownIcon from "../assets/down-arrow.svg";
import { getActiveZones, getMyProfile, updateCity } from "../api/authApi";
import { useCity } from "../context/CityContext";

const STATIC_CITIES = [
  { _id: "static_noida", zoneName: "Noida" },
  { _id: "static_delhi", zoneName: "Delhi" },
  { _id: "static_gurgaon", zoneName: "Gurgaon" },
  { _id: "static_bangalore", zoneName: "Bengaluru" },
  { _id: "static_mumbai", zoneName: "Mumbai" },
  { _id: "static_pune", zoneName: "Pune" }
];

const LocationDropdown = ({ onLocationSelect }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Noida");
  const [selectedCityId, setSelectedCityId] = useState("static_noida");
  const [zones, setZones] = useState([]);
  const [showAllZones, setShowAllZones] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [searchTerm, setSearchTerm] = useState("");
  const { updateCity: updateCityContext } = useCity();

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
    loadZonesInBackground();
    initializeLocationFromStorage();
  }, [isLoggedIn]);

  const loadZonesInBackground = useCallback(async () => {
    const cachedZones = sessionStorage.getItem("activeZones");
    const cachedTimestamp = sessionStorage.getItem("zonesTimestamp");
    const cacheValid = cachedTimestamp && (Date.now() - parseInt(cachedTimestamp)) < 300000;

    try {
      let zoneList = [];

      if (cachedZones && cacheValid) {
        zoneList = JSON.parse(cachedZones);
        setZones(zoneList);
        setApiLoaded(true);
        syncUserProfileWithZones(zoneList);
      } else {
        const zoneResponse = await getActiveZones();
        if (zoneResponse.data.success) {
          zoneList = zoneResponse.data.data || [];
          setZones(zoneList);
          setApiLoaded(true);
          sessionStorage.setItem("activeZones", JSON.stringify(zoneList));
          sessionStorage.setItem("zonesTimestamp", Date.now().toString());
          syncUserProfileWithZones(zoneList);
        }
      }
    } catch (error) {
      console.error("Error loading zones:", error);
      setApiLoaded(true);
    }
  }, [isLoggedIn]);

  const syncUserProfileWithZones = async (zoneList) => {
    if (!isLoggedIn) return;

    try {
      const profileResponse = await getMyProfile();
      const userData = profileResponse.data;
      const userZone = zoneList.find((z) => z._id === userData?.selectedCity);

      if (userZone) {
        setSelected(userZone.zoneName);
        setSelectedCityId(userZone._id);
        localStorage.setItem("userZone", JSON.stringify(userZone));
        updateCityContext(userZone);
        if (onLocationSelect) onLocationSelect(userZone);
      } else {
        const noidaZone = zoneList.find((z) => z.zoneName.toLowerCase().includes("noida"));
        if (noidaZone) {
          setSelected(noidaZone.zoneName);
          setSelectedCityId(noidaZone._id);
          localStorage.setItem("userZone", JSON.stringify(noidaZone));
          updateCityContext(noidaZone);
          if (onLocationSelect) onLocationSelect(noidaZone);
          updateCity({ zoneId: noidaZone._id }).catch(error => {
            console.error("Error updating user zone:", error);
          });
        }
      }
    } catch (error) {
      console.error("Error syncing user profile:", error);
    }
  };

  const initializeLocationFromStorage = () => {
    const defaultCity = STATIC_CITIES[0];
    
    if (isLoggedIn) {
      const savedZone = localStorage.getItem("userZone");
      if (savedZone) {
        const zoneData = JSON.parse(savedZone);
        setSelected(zoneData.zoneName);
        setSelectedCityId(zoneData._id);
        updateCityContext(zoneData);
        if (onLocationSelect) onLocationSelect(zoneData);
      } else {
        setSelected(defaultCity.zoneName);
        setSelectedCityId(defaultCity._id);
        updateCityContext(defaultCity);
        if (onLocationSelect) onLocationSelect(defaultCity);
      }
    } else {
      const savedZone = localStorage.getItem("guestZone");
      if (savedZone) {
        const zoneData = JSON.parse(savedZone);
        setSelected(zoneData.zoneName);
        setSelectedCityId(zoneData._id);
        updateCityContext(zoneData);
        if (onLocationSelect) onLocationSelect(zoneData);
      } else {
        setSelected(defaultCity.zoneName);
        setSelectedCityId(defaultCity._id);
        localStorage.setItem("guestZone", JSON.stringify(defaultCity));
        updateCityContext(defaultCity);
        if (onLocationSelect) onLocationSelect(defaultCity);
      }
    }
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
    setSearchTerm("");
  };

  const handleLocationClick = async (zone) => {
    if (zone._id.startsWith("static_")) {
      const actualZone = zones.find((z) => z.zoneName.toLowerCase() === zone.zoneName.toLowerCase());
      if (actualZone) {
        zone = actualZone;
      } else {
        setSelected(zone.zoneName);
        setSelectedCityId(zone._id);
        setOpen(false);
        setSearchTerm("");
        if (isLoggedIn) {
          localStorage.setItem("userZone", JSON.stringify(zone));
        } else {
          localStorage.setItem("guestZone", JSON.stringify(zone));
        }
        return;
      }
    }

    setSelected(zone.zoneName);
    setSelectedCityId(zone._id);
    setOpen(false);
    setSearchTerm("");
    updateCityContext(zone);
    if (onLocationSelect) onLocationSelect(zone);

    if (isLoggedIn) {
      localStorage.setItem("userZone", JSON.stringify(zone));
      updateCity({ zoneId: zone._id }).catch(error => {
        console.error("Error updating user zone:", error);
      });
    } else {
      localStorage.setItem("guestZone", JSON.stringify(zone));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && !event.target.closest("#locationDropdown")) {
        setOpen(false);
        setSearchTerm("");
        setShowAllZones(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const getDisplayZones = () => {
    if (searchTerm) {
      return zones.filter((zone) =>
        zone.zoneName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (showAllZones) {
      return zones;
    }

    return STATIC_CITIES;
  };

  const filteredZones = getDisplayZones();

  return (
    <div id="locationDropdown" className="relative">
      <div
        id="webScreen"
        className="hidden md:flex items-center border text-sm min-w-[200px] max-w-[250px] py-3 px-3 rounded-[6px] border-[#E3EDFC] bg-white cursor-pointer transition-colors"
        onClick={handleClick}
      >
        <div className="flex-shrink-0 mr-2">
          <img
            className="w-5 h-5 object-contain"
            src={locationIcon}
            alt="location"
          />
        </div>
        <span className="flex-1 truncate text-sm font-medium">
          {selected}
        </span>
        <div className="flex-shrink-0 ml-2">
          <img
            className={`w-4 h-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            src={dropdownIcon}
            alt="dropdown"
          />
        </div>
      </div>

      <div id="mobileScreen" className="md:hidden block">
        <div onClick={handleClick} role="button" className="flex items-center">
          <span className="text-[12px] px-1 leading-4 border-b-2 border-black flex items-center gap-1 font-medium max-w-[120px] truncate">
            <img
              className="w-4 h-4 object-contain shrink-0"
              src={locationIcon}
              alt=""
            />
            {selected}
          </span>
        </div>
      </div>

      {open && (
        <div className="absolute md:top-[calc(100%+4px)] top-[calc(100%+10px)] md:right-1/2 md:translate-x-1/2 right-0 min-w-[250px] z-50 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-fadeIn">
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          {filteredZones.length === 0 ? (
            <div className="px-3 py-4 text-center text-sm text-gray-500">
              No zones found
            </div>
          ) : (
            <>
              <ul className="max-h-[280px] overflow-y-auto">
                {filteredZones.map((zone) => (
                  <li
                    key={zone._id}
                    onClick={() => handleLocationClick(zone)}
                    className={`px-3 py-2.5 border-b border-gray-100 hover:bg-gray-50 cursor-pointer text-sm font-medium transition-colors last:border-b-0 ${
                      selectedCityId === zone._id
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-800"
                    }`}
                  >
                    {zone.zoneName}
                  </li>
                ))}
              </ul>
              {!searchTerm && !showAllZones && apiLoaded && zones.length > 0 && (
                <div
                  onClick={() => setShowAllZones(true)}
                  className="px-3 py-2.5 text-center text-sm font-medium text-blue-600 hover:bg-blue-50 cursor-pointer border-t border-gray-200"
                >
                  View More
                </div>
              )}
            </>
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
import React, { createContext, useContext, useState } from "react";


const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [selectedCityName, setSelectedCityName] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
 
  const updateCity = (zone) => {
    if (zone) {
      setSelectedCityName(zone.zoneName); 
      setSelectedCityId(zone._id); 
    }
  };

  return (
    <CityContext.Provider value={{ selectedCityName, selectedCityId, updateCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within CityProvider");
  }
  return context;
};
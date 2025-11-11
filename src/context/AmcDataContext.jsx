import React, { createContext, useContext, useState, useMemo } from "react";
import { featuresCar, featuresBike } from "../constants/amcDatas";

const AmcDataContext = createContext();

export const useAmcData = () => {
  const context = useContext(AmcDataContext);
  if (!context) {
    throw new Error("useAmcData must be used within AmcDataProvider");
  }
  return context;
};

export const AmcDataProvider = ({ children }) => {
  const [vehicleType, setVehicleType] = useState("car");
  const [amcType, setAmcType] = useState("luxury");
  const [purchasedCards, setPurchasedCards] = useState([]);

  const getAmcTabs = useMemo(() => {
    if (vehicleType === "bike") {
      return [
        { label: "Luxury Bike AMC", value: "luxury" },
        { label: "Premium Bike AMC", value: "premium" },
      ];
    }
    return [
      { label: "Luxury Car AMC", value: "luxury" },
      { label: "Premium Car AMC", value: "premium" },
    ];
  }, [vehicleType]);

  const getFeatures = useMemo(() => {
    return vehicleType === "bike" ? featuresBike : featuresCar;
  }, [vehicleType]);

  const addPurchasedCard = (card) => {
    setPurchasedCards((prev) => [...prev, card]);
  };

  return (
    <AmcDataContext.Provider
      value={{
        vehicleType,
        setVehicleType,
        amcType,
        setAmcType,
        getAmcTabs,
        features: getFeatures,
        purchasedCards,
        addPurchasedCard,
      }}
    >
      {children}
    </AmcDataContext.Provider>
  );
};

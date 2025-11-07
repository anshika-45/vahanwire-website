import React, { createContext, useContext, useState, useMemo } from "react";
import { pricingData, featuresCar, featuresBike } from "../constants/amcDatas";

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
  console.log("vewjbvbeuirbui", vehicleType);
  console.log("amkbeqjbfeb", amcType);
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

  const getComparePlans = useMemo(() => {
    const plans = pricingData[vehicleType][amcType];
    return [
      {
        key: "silver",
        name: plans.premium.name,
        price: plans.premium.price.toLocaleString(),
      },
      {
        key: "gold",
        name: plans.standard.name,
        price: plans.standard.price.toLocaleString(),
      },
      {
        key: "platinum",
        name: plans.basic.name,
        price: plans.basic.price.toLocaleString(),
      },
    ];
  }, [vehicleType, amcType]);

  const getFeatures = useMemo(() => {
    return vehicleType === "bike" ? featuresBike : featuresCar;
  }, [vehicleType]);

  return (
    <AmcDataContext.Provider
      value={{
        vehicleType,
        setVehicleType,
        amcType,
        setAmcType,
        getAmcTabs,
        comparePlans: getComparePlans,
        features: getFeatures,
      }}
    >
      {children}
    </AmcDataContext.Provider>
  );
};

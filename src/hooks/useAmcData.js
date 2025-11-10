import { useState, useEffect, useMemo } from "react";
import { featuresCar, featuresBike, pricingData } from "../constants/amcData";
const useAmcData = () => {
  const [vehicleType, setVehicleType] = useState(localStorage.getItem("vehicleType") || "car");
  const [amcType, setAmcType] = useState(localStorage.getItem("amcType") || "luxury");

  useEffect(() => {
    localStorage.setItem("vehicleType", vehicleType);
  }, [vehicleType]);

  useEffect(() => {
    localStorage.setItem("amcType", amcType);
  }, [amcType]);

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
      { key: "silver", name: plans.premium.name, price: plans.premium.price.toLocaleString() },
      { key: "gold", name: plans.standard.name, price: plans.standard.price.toLocaleString() },
      { key: "platinum", name: plans.basic.name, price: plans.basic.price.toLocaleString() },
    ];
  }, [vehicleType, amcType]);

  const getFeatures = useMemo(() => {
    return vehicleType === "bike" ? featuresBike : featuresCar;
  }, [vehicleType]);

  return {
    vehicleType,
    setVehicleType,
    amcType,
    setAmcType,
    getAmcTabs,
    comparePlans: getComparePlans,
    features: getFeatures,
  };
};
export default useAmcData;

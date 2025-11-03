import { useState, useEffect, useMemo } from "react";
import { comparePlans, features } from "../constants/amcData";
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

  return {
    vehicleType,
    setVehicleType,
    amcType,
    setAmcType,
    getAmcTabs,
    comparePlans,
    features,
  };
};
export default useAmcData;

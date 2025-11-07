import { useState, useMemo } from "react";
import {
  comparePlans,
  featuresCar,
  featuresBike,
  pricingData,
} from "../constants/amcDatas";

const useAmcData = () => {
  const [vehicleType, setVehicleType] = useState("car");
  const [amcType, setAmcType] = useState("luxury");

  console.log("useAmcData - vehicleType:", vehicleType);
  console.log("useAmcData - amcType:", amcType);

  const getAmcTabs = useMemo(() => {
    console.log("getAmcTabs recalculating for vehicleType:", vehicleType);
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
    console.log(
      "getComparePlans recalculating for vehicleType:",
      vehicleType,
      "amcType:",
      amcType
    );
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
    console.log("getFeatures recalculating for vehicleType:", vehicleType);
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

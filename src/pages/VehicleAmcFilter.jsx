import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import BreadcrumbBar from "../components/BreadcrumbBar";
import AMC from "../components/AMC";
import AmcTabs from "../components/AmcTabs";
import AmcCard from "../components/AmcCard";
import CompareTable from "../components/CompareTable";
import LatestOffer from "../components/LatestOffer";
import AmcBanner from "../components/AmcBanner";
import AddBanner from "../components/AddBanner";
import PlanSummaryPage from "../popup/PlanSummaryPage";
import useAmcData from "../hooks/useAmcData";

const VehicleAmcFilter = () => {
const { setIsLoggedIn } = useAuth();
  const { vehicleType, setVehicleType, amcType, setAmcType, getAmcTabs, comparePlans, features } = useAmcData();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Set user as logged in when this page loads (after filling popup details)
    setIsLoggedIn(true);

    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [setIsLoggedIn]);

  // Open popup when Buy Now is clicked
  const handleBuyNow = (plan) => {
    setSelectedPlan(plan);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedPlan(null);
    setIsPopupOpen(false);
  };

  return (
    <section className="bg-white w-full min-h-screen">
      <BreadcrumbBar />
      <AMC vehicleType={vehicleType} setVehicleType={setVehicleType} isFilter={true} />
      <AmcTabs amcType={amcType} setAmcType={setAmcType} showRemoveFilter tabs={getAmcTabs} vehicleType={vehicleType} />
      <AmcCard vehicleType={vehicleType} onBuy={handleBuyNow} />

      {/* Compare Table */}
      <CompareTable plans={comparePlans} features={features} onBuyNow={handleBuyNow} />

      <LatestOffer />
      <div className="flex flex-col space-y-10">
        <AmcBanner onBuy={handleBuyNow} />
        <AddBanner />
      </div>

      {/* Plan Summary Popup */}
      {isPopupOpen && (
        <PlanSummaryPage isOpen={isPopupOpen} plan={selectedPlan} onClose={handleClosePopup} />
      )}
    </section>
  );
};
export default VehicleAmcFilter;

import React, { useState } from "react";
import BreadcrumbBar from "../components/BreadcrumbBar";
import AMC from "../components/AMC";
import AmcTabs from "../components/AmcTabs";
import AMCCards from "../components/AmcCard";
import CompareTable from "../components/CompareTable";
import LatestOffer from "../components/LatestOffer";
import AmcBanner from "../components/AmcBanner";
import AddBanner from "../components/AddBanner";
import VerifyNumberPopup from "../popup/VerifyNumberPopup";
import EnterVehicleNumber from "../popup/EnterVehicleNumber";
import { useAmcData } from "../context/AmcDataContext";
import { useAuth } from "../context/AuthContext";

const VehicleAmc = () => {
  const { features } = useAmcData();
  const { isLoggedIn } = useAuth();
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleGenericBuy = () => {
    setSelectedPlan(null);
    if (isLoggedIn) {
      setIsVehicleOpen(true);
    } else {
      setIsVerifyOpen(true);
    }
  };

  const handlePlanBuy = (plan) => {
    setSelectedPlan(plan);
    if (isLoggedIn) {
      setTimeout(() => setIsVehicleOpen(true), 0);
    } else {
      setIsVerifyOpen(true);
    }
  };

  return (
    <section className="w-full pt-15  bg-gray-50">
      <BreadcrumbBar />
      <AMC />
      <AmcTabs />
      <AMCCards onBuy={handlePlanBuy} />
      <CompareTable features={features} onBuy={handlePlanBuy} />
      <LatestOffer />
      <div id="amcTabs" className="container space-y-8 sm:space-y-10 mb-12">
        <AmcBanner onBuy={handleGenericBuy} /></div>
        <div className="w-full">
          <AddBanner />
        </div>
      
      <VerifyNumberPopup isOpen={isVerifyOpen} onClose={() => setIsVerifyOpen(false)} />
      <EnterVehicleNumber isOpen={isVehicleOpen} onClose={() => setIsVehicleOpen(false)} plan={selectedPlan} />
    </section>
  );
};

export default VehicleAmc;
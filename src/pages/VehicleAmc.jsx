import React, { useState } from "react";
import BreadcrumbBar from "../components/BreadcrumbBar";
import AMC from "../components/AMC";
import AmcTabs from "../components/AmcTabs";
import AmcCard from "../components/AmcCard";
import CompareTable from "../components/CompareTable";
import LatestOffer from "../components/LatestOffer";
import AmcBanner from "../components/AmcBanner";
import AddBanner from "../components/AddBanner";
import VerifyNumberPopup from "../popup/VerifyNumberPopup";
import EnterVehicleNumber from "../popup/EnterVehicleNumber";
import { useAmcData } from "../context/AmcDataContext";
import { useAuth } from "../context/AuthContext";

const VehicleAmc = () => {
  const {  comparePlans, features } = useAmcData();
  const { isLoggedIn } = useAuth();
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanBuy = (plan) => {
    setSelectedPlan(plan);
    if (isLoggedIn) {
      setTimeout(() => setIsVehicleOpen(true), 0);
    } else {
      setIsVerifyOpen(true);
    }
  };

  return (
    <section>
      <BreadcrumbBar />
      <AMC />
      <AmcTabs />
      <AmcCard/>
      <CompareTable plans={comparePlans} features={features} onBuy={handlePlanBuy} />
      <LatestOffer />
      <div className="flex flex-col space-y-30">
        <AmcBanner/>
        <div>
          <AddBanner />
        </div>
      </div>
      <VerifyNumberPopup isOpen={isVerifyOpen} onClose={() => setIsVerifyOpen(false)} />
      <EnterVehicleNumber isOpen={isVehicleOpen} onClose={() => setIsVehicleOpen(false)} plan={selectedPlan} />
    </section>
  );
};

export default VehicleAmc;
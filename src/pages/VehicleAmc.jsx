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
import useAmcData from "../hooks/useAmcData";
import { useAuth } from "../context/AuthContext";

const VehicleAmc = () => {
  const { vehicleType, setVehicleType, amcType, setAmcType, getAmcTabs, comparePlans, features } = useAmcData();
  const { isLoggedIn } = useAuth();
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);

  const handleBuy = () => {
    if (isLoggedIn) {
      setIsVehicleOpen(true);
    } else {
      setIsVerifyOpen(true);
    }
  };

  return (
    <section>
      <BreadcrumbBar />
      <AMC vehicleType={vehicleType} setVehicleType={setVehicleType} />
      <AmcTabs amcType={amcType} setAmcType={setAmcType} tabs={getAmcTabs} vehicleType={vehicleType} />
      <AmcCard vehicleType={vehicleType} onBuy={handleBuy} />
      <CompareTable plans={comparePlans} features={features} onBuy={handleBuy} />
      <LatestOffer/>
      <div className="flex flex-col space-y-30">
        <AmcBanner onBuy={handleBuy} />
        <div>
          <AddBanner />
        </div>
      </div>
      <VerifyNumberPopup
        isOpen={isVerifyOpen}
        onClose={() => setIsVerifyOpen(false)}
      />
      <EnterVehicleNumber
        isOpen={isVehicleOpen}
        onClose={() => setIsVehicleOpen(false)}
      />
    </section>
  );
};

export default VehicleAmc;

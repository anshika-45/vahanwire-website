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
  const { 
    vehicleType, setVehicleType, 
    amcType, setAmcType, 
    getAmcTabs, comparePlans, features 
  } = useAmcData();

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
    <section className="w-full pt-4 sm:pt-6 bg-gray-50">

        <BreadcrumbBar />
        <AMC 
          vehicleType={vehicleType} 
          setVehicleType={setVehicleType} 
        />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 mb-12">

        <AmcTabs 
          amcType={amcType} 
          setAmcType={setAmcType} 
          tabs={getAmcTabs} 
          vehicleType={vehicleType} 
        />

        <AmcCard 
          vehicleType={vehicleType} 
          amcType={amcType} 
          onBuy={handleBuy} 
        />

        <CompareTable 
          plans={comparePlans} 
          features={features} 
          onBuy={handleBuy} 
        />

        <LatestOffer />


        <div className="flex flex-col lg:flex-col gap-6">
          <AmcBanner onBuy={handleBuy} />

        </div>
      </div>
          <div className="w-full">
            <AddBanner />
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

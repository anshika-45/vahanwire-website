import React, { useState, Suspense } from "react";
import BreadcrumbBar from "../components/BreadcrumbBar";
import AMC from "../components/AMC";
import useAmcData from "../hooks/useAmcData";
import { useAuth } from "../context/AuthContext";
const AmcTabs = React.lazy(() => import("../components/AmcTabs"));
const AmcCard = React.lazy(() => import("../components/AmcCard"));
const CompareTable = React.lazy(() => import("../components/CompareTable"));
const LatestOffer = React.lazy(() => import("../components/LatestOffer"));
const AmcBanner = React.lazy(() => import("../components/AmcBanner"));
const AddBanner = React.lazy(() => import("../components/AddBanner"));
const VerifyNumberPopup = React.lazy(() => import("../popup/VerifyNumberPopup"));
const EnterVehicleNumber = React.lazy(() => import("../popup/EnterVehicleNumber"));
const CardLoader = () => (
  <div className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
);
const TableLoader = () => (
  <div className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
);
const BannerLoader = () => (
  <div className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
);
const ComponentLoader = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#266DDF]"></div>
  </div>
);
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
    <section className="w-full pt-15 bg-gray-50">
      <BreadcrumbBar />
      <AMC 
        vehicleType={vehicleType} 
        setVehicleType={setVehicleType} 
      />
      <div className="container space-y-8 sm:space-y-10 mb-12">
        <Suspense fallback={<ComponentLoader />}>
          <AmcTabs 
            amcType={amcType} 
            setAmcType={setAmcType} 
            tabs={getAmcTabs} 
            vehicleType={vehicleType} 
          />
        </Suspense>
        <Suspense fallback={<CardLoader />}>
          <AmcCard 
            vehicleType={vehicleType} 
            amcType={amcType} 
            onBuy={handleBuy} 
          />
        </Suspense>
        <Suspense fallback={<TableLoader />}>
          <CompareTable 
            plans={comparePlans} 
            features={features} 
            onBuy={handleBuy} 
          />
        </Suspense>
        <Suspense fallback={<BannerLoader />}>
          <LatestOffer />
        </Suspense>

        <div className="flex flex-col lg:flex-col gap-6">
          <Suspense fallback={<BannerLoader />}>
            <AmcBanner onBuy={handleBuy} />
          </Suspense>
        </div>
      </div>
      <div className="w-full">
        <Suspense fallback={<BannerLoader />}>
          <AddBanner />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <VerifyNumberPopup
          isOpen={isVerifyOpen}
          onClose={() => setIsVerifyOpen(false)}
        />
      </Suspense>
      <Suspense fallback={null}>
        <EnterVehicleNumber
          isOpen={isVehicleOpen}
          onClose={() => setIsVehicleOpen(false)}
        />
      </Suspense>
    </section>
  );
};
export default VehicleAmc;
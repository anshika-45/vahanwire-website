import React, { useState, Suspense, useEffect } from "react";
import AMC from "../components/AMC";
import { useAmcData } from "../context/AmcDataContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AMCCards from "../components/AmcCard";
import BreadcrumbBar from "../components/BreadcrumbBar";
import { getUserVehicles } from "../api/vehicleApi";
const AmcTabs = React.lazy(() => import("../components/AmcTabs"));
const AmcCard = React.lazy(() => import("../components/AmcCard"));
const CompareTable = React.lazy(() => import("../components/CompareTable"));
const LatestOffer = React.lazy(() => import("../components/LatestOffer"));
const AmcBanner = React.lazy(() => import("../components/AmcBanner"));
const AddBanner = React.lazy(() => import("../components/AddBanner"));
const VerifyNumberPopup = React.lazy(() =>
  import("../popup/VerifyNumberPopup")
);
const EnterVehicleNumber = React.lazy(() =>
  import("../popup/EnterVehicleNumber")
);
const SelectVehicle = React.lazy(() => import("../popup/SelectVehicle"));
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
  const { features, vehicleType, setVehicleType, filterActive, filterData, clearFilter } =
    useAmcData();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);
  const [isSelectVehicleOpen, setIsSelectVehicleOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const checkFilterValidity = async () => {
      if (filterActive && filterData) {
        // Check if the selected vehicle still exists
        const vehicles = await getUserVehicles();
        const vehicleExists = vehicles.some(
          v => v.vehicleNumber === filterData.vehicle?.vehicleNumber
        );
        
        if (vehicleExists) {
          // Vehicle exists, navigate to filter page
          navigate("/vehicle-amc-filter", {
            state: filterData,
            replace: true,
          });
        } else {
          // Vehicle was deleted, clear the filter
          clearFilter();
        }
      }
    };
    
    checkFilterValidity();
  }, [filterActive, filterData, navigate]);

  const checkUserVehicles = async () => {
    try {
      const vehicles = await getUserVehicles();
      return vehicles && vehicles.length > 0;
    } catch (error) {
      console.error("Error checking vehicles:", error);
      return false;
    }
  };

  const handleGenericBuy = async () => {
    setSelectedPlan(null);
    setIsVehicleOpen(false);
    setIsSelectVehicleOpen(false);
    
    if (isLoggedIn) {
      const hasVehicles = await checkUserVehicles();
      if (hasVehicles) {
        setIsVehicleOpen(false);
        setIsSelectVehicleOpen(true);
      } else {
        setIsSelectVehicleOpen(false);
        setIsVehicleOpen(true);
      }
    } else {
      setIsVerifyOpen(true);
    }
  };

  const handlePlanBuy = async (plan) => {
    setSelectedPlan(plan);
    setIsVehicleOpen(false);
    setIsSelectVehicleOpen(false);
    
    if (isLoggedIn) {
      const hasVehicles = await checkUserVehicles();
      if (hasVehicles) {
        setIsVehicleOpen(false);
        setIsSelectVehicleOpen(true);
      } else {
        setIsSelectVehicleOpen(false);
        setIsVehicleOpen(true);
      }
    } else {
      setIsVerifyOpen(true);
    }
  };

  return (
    <section className="w-full">
      <AMC vehicleType={vehicleType} setVehicleType={setVehicleType} />

      <div className="container space-y-8 sm:space-y-10 mb-12">
        <Suspense fallback={<ComponentLoader />}>
          <AmcTabs />
        </Suspense>
      </div>

      <Suspense fallback={<CardLoader />}>
        <AMCCards onBuy={handlePlanBuy} />
      </Suspense>
      <Suspense fallback={<TableLoader />}>
        <CompareTable features={features} onBuy={handlePlanBuy} />
      </Suspense>
      {/* <Suspense fallback={<BannerLoader />}>
        <LatestOffer />
      </Suspense> */}

      {/* <div className="flex flex-col lg:flex-col gap-6">
        <Suspense fallback={<BannerLoader />}>
          <AmcBanner onBuy={handleGenericBuy} />
        </Suspense>
      </div> */}
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
          plan={selectedPlan}
          onBack={()=>setIsVehicleOpen(false)}
        />
      </Suspense>
      <Suspense fallback={null}>
        <SelectVehicle
          isOpen={isSelectVehicleOpen}
          onClose={() => setIsSelectVehicleOpen(false)}
          plan={selectedPlan}
        />
      </Suspense>
    </section>
  );
};

export default VehicleAmc;

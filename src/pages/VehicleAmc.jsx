import React, { useState, Suspense, useEffect } from "react";
// import AMC from "../components/AMC";

// import { useAmcData } from "../context/AmcDataContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AMCCards from "../components/AmcCard";
import { useCity } from "../context/CityContext";
// import { getUserVehicleWithoutAMC } from "../api/vehicleApi";

import PlanSummaryPage from "../popup/PlanSummaryPage";
// import { useAMCPlans } from "../context/AmcPlanContext";

const AmcTabs = React.lazy(() => import("../components/AmcTabs"));
const CompareTable = React.lazy(() => import("../components/CompareTable"));
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
// const { features, vehicleType, setVehicleType, filterActive, filterData, clearFilter } =
  //   useAmcData();
  const { isLoggedIn } = useAuth();
  const { selectedCityName } = useCity();
  const navigate = useNavigate();

  // const {
    // setSelectedPlan,
    // selectedPlan
  // } = useAMCPlans();

  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);
  const [isSelectVehicleOpen, setIsSelectVehicleOpen] = useState(false);

  const [isPlanSummaryOpen, setIsPlanSummaryOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // useEffect(() => {
  //   const checkFilterValidity = async () => {
  //     if (filterActive && filterData) {
  //       const vehicles = await getUserVehicleWithoutAMC();
  //       const vehicleExists = vehicles.some(
  //         v => v.vehicleNumber === filterData.vehicle?.vehicleNumber
  //       );

  //       if (vehicleExists) {
  //         navigate("/vehicle-amc-filter", {
  //           state: { ...filterData, vehicleType, amcType: filterData.amcType },
  //           replace: true,
  //         });
  //       } else {
  //         clearFilter();
  //       }
  //     }
  //   };

  //   checkFilterValidity();
  // }, [filterActive, filterData, navigate, vehicleType]);

  const handlePlanBuy = async (plan, vehicle = null) => {
    
    setSelectedPlan(plan);
    localStorage.setItem("selectedPlan", JSON.stringify(plan))

    if (vehicle) {
      setSelectedVehicle(vehicle);
    }

    setIsVehicleOpen(false);
    setIsSelectVehicleOpen(false);
    setIsVerifyOpen(false);


    setIsPlanSummaryOpen(true);
  };

  const handleClosePlanSummary = () => {
    setIsPlanSummaryOpen(false);
  };

  const handleBackPlanSummary = () => {
    setIsPlanSummaryOpen(false);

  };

  const handleVehicleSelect = (vehicle, plan) => {
    setSelectedVehicle(vehicle);
    handlePlanBuy(plan, vehicle);
  };

  const handleEnterVehicleNumberSuccess = (vehicleData, plan) => {
    setSelectedVehicle(vehicleData);
    handlePlanBuy(plan, vehicleData);
  };

  // TODO: AMC - checkUserVehicles and handleBuyAmc commented for deployment safety
  // const checkUserVehicles = async () => {
  //   try {
  //     const vehicles = await getUserVehicleWithoutAMC();
  //     return vehicles && vehicles.length > 0;
  //   } catch (error) {
  //     console.error("Error checking vehicles:", error);
  //     return false;
  //   }
  // };

  // const handleBuyAmc = async () => {
  //   handleClosePlanSummary()
  //   if (isLoggedIn) {
  //     const hasVehicles = await checkUserVehicles();
  //     if (hasVehicles) {
  //       setIsVehicleOpen(false);
  //       setIsSelectVehicleOpen(true);
  //     } else {
  //       setIsSelectVehicleOpen(false);
  //       setIsVehicleOpen(true);
  //     }
  //   } else {
  //     setIsVerifyOpen(true);
  //   }
  // }


  return (
    <section className="w-full">
      {/* TODO: AMC Features commented out for safe deployment */}
      {/* <AMC vehicleType="car" setVehicleType={() => {}} /> */}

      {/* <div className="container space-y-8 sm:space-y-10 mb-12">
        <Suspense fallback={<ComponentLoader />}>
          <AmcTabs />
        </Suspense>
      </div>

      <Suspense fallback={<CardLoader />}>
        <AMCCards
          onBuy={handlePlanBuy}
          selectedCityName={selectedCityName}
        />
      </Suspense>

      <Suspense fallback={<TableLoader />}>
        <CompareTable
          features={[]}
          onBuy={handlePlanBuy}
          selectedCityName={selectedCityName}
        />
      </Suspense>

      <Suspense fallback={null}>
        <VerifyNumberPopup
          isOpen={isVerifyOpen}
          onClose={() => setIsVerifyOpen(false)}
          onBack={() => setIsVerifyOpen(false)}
        />
      </Suspense>

      <Suspense fallback={null}>
        <EnterVehicleNumber
          isOpen={isVehicleOpen}
          onClose={() => setIsVehicleOpen(false)}
          plan={selectedPlan}
          onBack={() => setIsVehicleOpen(false)}
          onSuccess={handleEnterVehicleNumberSuccess}
        />
      </Suspense>

      <Suspense fallback={null}>
        <SelectVehicle
          isOpen={isSelectVehicleOpen}
          onClose={() => setIsSelectVehicleOpen(false)}
          onBack={() => setIsSelectVehicleOpen(false)}
          plan={selectedPlan}
          onSelect={handleVehicleSelect}
        />
      </Suspense>

      <Suspense fallback={null}>
        <PlanSummaryPage
          isOpen={isPlanSummaryOpen}
          plan={selectedPlan}
          onClose={handleClosePlanSummary}
          onBack={handleBackPlanSummary}
          vehicle={selectedVehicle}
          onBuyAmc={handleBuyAmc}
        />
      </Suspense> */}
      <div className="container py-12 text-center">
        <h1>AMC Page - Features temporarily disabled for deployment</h1>
        <p>Will be enabled soon.</p>
      </div>
    </section>
  );
};

export default VehicleAmc;

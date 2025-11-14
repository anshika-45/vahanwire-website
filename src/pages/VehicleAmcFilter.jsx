import React, { useState, useEffect, Suspense } from "react";
const AmcTabs = React.lazy(() => import("../components/AmcTabs"));
const AmcCard = React.lazy(() => import("../components/AmcCard"));
const CompareTable = React.lazy(() => import("../components/CompareTable"));
const LatestOffer = React.lazy(() => import("../components/LatestOffer"));
const AmcBanner = React.lazy(() => import("../components/AmcBanner"));
const AddBanner = React.lazy(() => import("../components/AddBanner"));
const PlanSummaryPage = React.lazy(() => import("../popup/PlanSummaryPage"));
const SuccessPurchase = React.lazy(() => import("../popup/SuccessPurchase"));
const FailedPurchase = React.lazy(() => import("../popup/FailedPurchase"));
import { useAuth } from "../context/AuthContext";
import { createAMCPurchase } from "../api/amcApi";
import {getPaymentStatus } from "../api/paymentApi";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import AMC from "../components/AMC";
import useAmcData from "../hooks/useAmcData";

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

const VehicleAmcFilter = () => {
  const { isLoggedIn } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
   const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  const {
    plans,
    vehicle: locationVehicle,
    selectedPlan: initialSelectedPlan,
  } = location.state || {};

  const {
    vehicleType,
    setVehicleType,
    amcType,
    setAmcType,
    getAmcTabs,
    comparePlans,
    features,
  } = useAmcData();

  const [vehicle, setVehicle] = useState(() => {
    const stored = sessionStorage.getItem('failedPaymentData');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.vehicle || locationVehicle;
    }
    return locationVehicle;
  });

  const [selectedPlanState, setSelectedPlanState] = useState(() => {
    const stored = sessionStorage.getItem('failedPaymentData');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.selectedPlan || null;
    }
    return null;
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(null);

  const status = searchParams.get("status");
  const txnid = searchParams.get("txnid");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  // useEffect(() => {
  //   document.body.style.overflow = "auto";
  //   document.documentElement.style.overflow = "auto";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //     document.documentElement.style.overflow = "auto";
  //   };
  // }, []);


    useEffect(() => {
    const checkPaymentStatus = async () => {
      const txnid = searchParams.get("txnid");
      const status = searchParams.get("status");

      if (txnid && !status) {
        setIsCheckingStatus(true);
        try {
          const result = await getPaymentStatus(txnid);
          
          if (result.success) {
            const paymentStatus = result.data.status;
            
            if (paymentStatus === "success") {
              setShowPopup("success");
              searchParams.set("status", "success");
            } else if (paymentStatus === "failed") {
              setShowPopup("failed");
              searchParams.set("status", "failed");
            } else if (paymentStatus === "pending") {
              setTimeout(() => checkPaymentStatus(), 3000);
              return;
            }
            
            setSearchParams(searchParams, { replace: true });
          }
        } catch (error) {
          console.error("Status check failed:", error);
        } finally {
          setIsCheckingStatus(false);
        }
      }
    };

    checkPaymentStatus();
  }, [searchParams.get("txnid")]);

   useEffect(() => {
    if (status === "success" || status === "failed") {
      setShowPopup(status);
      
      if (status === "failed") {
        const stored = sessionStorage.getItem('failedPaymentData');
        if (stored) {
          const parsed = JSON.parse(stored);
          setVehicle(parsed.vehicle);
          setSelectedPlanState(parsed.selectedPlan);
        }
      } else if (status === "success") {
        sessionStorage.removeItem('failedPaymentData');
      }
    }
  }, [status]);

  useEffect(() => {
    // Restore vehicleType from sessionStorage on page load
    const stored = sessionStorage.getItem('selectedVehicleType');
    if (stored && stored !== vehicleType) {
      setVehicleType(stored);
    }
  }, []);

  const handleBuyNow = async (plan) => {
    if (!vehicle?.vehicleNumber) {
      alert("Please select a vehicle first.");
      return;
    }

    const purchaseResponse = await createAMCPurchase({
      planId: plan._id,
      vehicleNumber: vehicle.vehicleNumber,
    });

    if (!purchaseResponse.success) {
      alert(purchaseResponse.message || "Failed to create AMC purchase");
      return;
    }

    const purchaseData = purchaseResponse.data;
    const planData = {
      ...plan,
      purchaseId: purchaseData._id,
      vehicleNumber: vehicle.vehicleNumber,
    };

    sessionStorage.setItem('failedPaymentData', JSON.stringify({
      selectedPlan: planData,
      vehicle: vehicle
    }));

    setSelectedPlanState(planData);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedPlanState(null);
    setIsPopupOpen(false);
  };

  const handleClosePaymentPopup = () => {
    setShowPopup(null);
    searchParams.delete("status");
    searchParams.delete("txnid");
    setSearchParams(searchParams, { replace: true });
  };

  const handleSuccessClose = () => {
    sessionStorage.removeItem('failedPaymentData');
    setShowPopup(null);
    searchParams.delete("status");
    searchParams.delete("txnid");
    setSearchParams(searchParams, { replace: true });
  };

  if (!isLoggedIn) {
    return null;
  }

  if (isCheckingStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying payment status...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white w-full min-h-screen">
      <AMC
        vehicleType={vehicleType}
        setVehicleType={setVehicleType}
        isFilter={true}
      />
      <Suspense fallback={<ComponentLoader />}>
        <AmcTabs
          amcType={amcType}
          setAmcType={setAmcType}
          showRemoveFilter
          tabs={getAmcTabs}
          vehicleType={vehicleType}
        />
      </Suspense>
      <Suspense fallback={<CardLoader />}>
        <AmcCard
          vehicleType={vehicleType}
          onBuy={handleBuyNow}
          plans={plans}
          vehicle={vehicle}
        />
      </Suspense>
      <Suspense fallback={<TableLoader />}>
        <CompareTable
          plansAre={plans}
          features={features}
          onBuyNow={handleBuyNow}
          vehicle={vehicle}
        />
      </Suspense>
      {/* <Suspense fallback={<BannerLoader />}>
        <LatestOffer />
      </Suspense> */}

      {/* <div className="flex flex-col space-y-10">
        <Suspense fallback={<BannerLoader />}>
          <AmcBanner onBuy={handleBuyNow} onBuyNow={handleBuyNow} plan={plans?.[0]}/>
        </Suspense>
      </div> */}

      {isPopupOpen && (
        <Suspense fallback={null}>
          <PlanSummaryPage
            isOpen={isPopupOpen}
            plan={selectedPlanState}
            onClose={handleClosePopup}
            vehicle={vehicle}
          />
        </Suspense>
      )}

      {showPopup === "success" && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <Suspense fallback={<div className="text-white">Loading...</div>}>
            <SuccessPurchase
              onClose={handleSuccessClose}
              purchaseData={selectedPlanState}
            />
          </Suspense>
        </div>
      )}

      {showPopup === "failed" && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <Suspense fallback={<div className="text-white">Loading...</div>}>
            <FailedPurchase
              reason="Your UPI payment was not completed or cancelled."
              onClose={handleClosePaymentPopup}
              purchaseData={selectedPlanState}
            />
          </Suspense>
        </div>
      )}
    </section>
  );
};

export default VehicleAmcFilter;
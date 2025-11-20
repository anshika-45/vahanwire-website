import React, { useState, useEffect, Suspense } from "react";
const AmcTabs = React.lazy(() => import("../components/AmcTabs"));
const AmcCard = React.lazy(() => import("../components/AmcCard"));
const CompareTable = React.lazy(() => import("../components/CompareTable"));
const PlanSummaryPage = React.lazy(() => import("../popup/PlanSummaryPage"));
const SuccessPurchase = React.lazy(() => import("../popup/SuccessPurchase"));
const FailedPurchase = React.lazy(() => import("../popup/FailedPurchase"));
import { useAuth } from "../context/AuthContext";
import { createAMCPurchase } from "../api/amcApi";
import { getPaymentError, getPaymentStatus } from "../api/paymentApi";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import AMC from "../components/AMC";
import useAmcData from "../hooks/useAmcData";

const CardLoader = () => (
  <div className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
);
const TableLoader = () => (
  <div className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
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
  const [error, setError] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [errorReason, setErrorReason] = useState(null);
  const {
    plans: locationPlans,
    vehicle: locationVehicle,
    selectedPlan: initialSelectedPlan,
    vehicleType: locationVehicleType,
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

  const txnid = searchParams.get("txnid");
  const status = searchParams.get("status");

  const [vehicle, setVehicle] = useState(() => {
    if (locationVehicle) {
      return locationVehicle;
    }
    
    const saved = localStorage.getItem('selectedVehicleData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
          return parsed.vehicle;
        } else {
          localStorage.removeItem('selectedVehicleData');
        }
      } catch (e) {
        console.error('Error parsing saved vehicle data:', e);
        localStorage.removeItem('selectedVehicleData');
      }
    }
    
    return null;
  });

  const [plans, setPlans] = useState(() => {
    if (locationPlans) {
      return locationPlans;
    }
    
    const saved = localStorage.getItem('selectedVehicleData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
          return parsed.plans || [];
        }
      } catch (e) {
        console.error('Error parsing saved plans:', e);
      }
    }
    
    return [];
  });

  const [selectedPlanState, setSelectedPlanState] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(null);


  useEffect(() => {
    if (locationVehicle && locationPlans) {
      const newVehicleData = {
        vehicle: locationVehicle,
        vehicleType: locationVehicleType || vehicleType,
        plans: locationPlans,
        timestamp: Date.now()
      };
      
      localStorage.setItem('selectedVehicleData', JSON.stringify(newVehicleData));
      
      setVehicle(locationVehicle);
      setPlans(locationPlans);

      if(locationVehicleType){
        setVehicleType(locationVehicleType);
      }
    }
  }, [locationVehicle, locationPlans, locationVehicleType]);

  useEffect(() => {
    const saved = localStorage.getItem('selectedVehicleData');
    if (saved && !vehicleType) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.vehicleType) {
          setVehicleType(parsed.vehicleType);
        }
      } catch (e) {
        console.error('Error parsing vehicle type:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (txnid && !status) {
        setIsCheckingStatus(true);
        try {
          const result = await getPaymentStatus(txnid);

          if (result.success) {
            const paymentStatus = result.data.status;

            if (paymentStatus === "success") {
              searchParams.set("status", "success");
              setSearchParams(searchParams, { replace: true });
            } else if (paymentStatus === "failed") {
              searchParams.set("status", "failed");
              setSearchParams(searchParams, { replace: true });
            } else if (paymentStatus === "pending") {
              setTimeout(() => checkPaymentStatus(), 3000);
              return;
            }
          }
        } catch (error) {
          console.error("Status check failed:", error);
        } finally {
          setIsCheckingStatus(false);
        }
      }
    };

    checkPaymentStatus();
  }, [txnid]);

  useEffect(() => {
    const fetchErrorData = async () => {
      if (status === "failed" && txnid) {
        try {
          const errorData = await getPaymentError(txnid);
          if (errorData.success) {
            setError(errorData.data.errorMessage);
            setErrorCode(errorData.data.errorCode);
            setErrorReason(errorData.data.errorReason);
          }
        } catch (error) {
          console.error("Error fetching payment error:", error);
        }
      }
      
      if (status === "success" || status === "failed") {
        setShowPopup(status);
      }
    };

    fetchErrorData();
  }, [status, txnid]);


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
    localStorage.removeItem('selectedVehicleData');
    
    setShowPopup(null);
    setVehicle(null);
    setPlans([]);
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
              error = {error}
              errorCode = {errorCode}
              errorReason = {errorReason}
            />
          </Suspense>
        </div>
      )}
    </section>
  );
};

export default VehicleAmcFilter;
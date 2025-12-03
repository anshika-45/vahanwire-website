import React, { useState, useEffect, Suspense } from "react";
const AmcCard = React.lazy(() => import("../components/AmcCard"));
const CompareTable = React.lazy(() => import("../components/CompareTable"));
const PlanSummaryAndBuy = React.lazy(() => import("../popup/PlanSummaryAndBuy"));
const SuccessPurchase = React.lazy(() => import("../popup/SuccessPurchase"));
const FailedPurchase = React.lazy(() => import("../popup/FailedPurchase"));
const SelectVehicle = React.lazy(() => import("../popup/SelectVehicle"));
import { useAuth } from "../context/AuthContext";
import { createAMCPurchase } from "../api/amcApi";
import { getPaymentError, getPaymentStatus } from "../api/paymentApi";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useAmcData } from "../context/AmcDataContext";
import Button from "../components/Button";
import { Edit } from "lucide-react";
import { useAMCPlans } from "../context/AmcPlanContext";
import FinalDetailsPopup from "../popup/FinalDetailsPopup";

const CardLoader = () => (
  <div className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
);
const TableLoader = () => (
  <div className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
);

const VehicleAmcFilter = () => {
  const { isLoggedIn } = useAuth();
  const { clearFilter } = useAmcData();
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
    amcType: locationAmcType,
  } = location.state || {};

  const {
    vehicleType,
    setVehicleType,
    amcType,
    setAmcType,
    features,
  } = useAmcData();

  const txnid = searchParams.get("txnid");
  const status = searchParams.get("status");

  const [vehicle, setVehicle] = useState(() => {
    if (locationVehicle) {
      return locationVehicle;
    }

    const saved = localStorage.getItem("selectedVehicleData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
          return parsed.vehicle;
        } else {
          localStorage.removeItem("selectedVehicleData");
        }
      } catch (e) {
        localStorage.removeItem("selectedVehicleData");
      }
    }

    return null;
  });

  const [plans, setPlans] = useState(() => {
    if (locationPlans) {
      return locationPlans;
    }

    const saved = localStorage.getItem("selectedVehicleData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
          return parsed.plans || [];
        }
      } catch (e) {
        return [];
      }
    }

    return [];
  });

  const [selectedPlanState, setSelectedPlanState] = useState(null);
  const [purchasedPlanState,setPurchasedPlanState] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(null);
  const [isSelectVehicleOpen, setIsSelectVehicleOpen] = useState(false);

  const {
      setSelectedPlan,
      selectedPlan
    } = useAMCPlans();

  useEffect(() => {
    const saved = localStorage.getItem("selectedVehicleData");

    if (!saved) {
      clearFilter();
      navigate("/vehicle-amc", { replace: true });
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      const isExpired = Date.now() - parsed.timestamp >= 24 * 60 * 60 * 1000;
      const hasInvalidData = !parsed.vehicle || !parsed.plans || parsed.plans.length === 0;

      if (isExpired || hasInvalidData) {
        clearFilter();
        navigate("/vehicle-amc", { replace: true });
      }
    } catch (e) {
      clearFilter();
      navigate("/vehicle-amc", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (locationVehicle && locationPlans) {
      const newVehicleData = {
        vehicle: locationVehicle,
        vehicleType: locationVehicleType || vehicleType,
        amcType: locationAmcType || amcType,
        plans: locationPlans,
        timestamp: Date.now(),
      };

      localStorage.setItem(
        "selectedVehicleData",
        JSON.stringify(newVehicleData)
      );

      setVehicle(locationVehicle);
      setPlans(locationPlans);

      if (locationVehicleType) {
        setVehicleType(locationVehicleType);
      }
      if (locationAmcType) {
        setAmcType(locationAmcType);
      }
    }
  }, [locationVehicle, locationPlans, locationVehicleType, locationAmcType]);

  useEffect(() => {
    const saved = localStorage.getItem("selectedVehicleData");
    if (saved && !vehicleType) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.vehicleType) {
          setVehicleType(parsed.vehicleType);
        }
      } catch (e) {}
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
          localStorage.setItem('paymentResults',JSON.stringify(result))

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
        } catch (error) {}
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
    console.log("sacjjagca",purchaseData);
    const planData = {
      ...plan,
      purchaseId: purchaseData._id,
      vehicleNumber: vehicle.vehicleNumber,
    };
    console.log("dkhkshzcjsx",planData);
    setSelectedPlanState(planData);
    setPurchasedPlanState(planData);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    console.log('new state of purchase',purchasedPlanState)
    setSelectedPlanState(null);
    setIsPopupOpen(false);
  };

  const handleClosePaymentPopup = () => {

    const isPlanValid = JSON.parse(localStorage.getItem('isPlanValid'))

    setShowPopup(null);
    searchParams.delete("status");
    searchParams.delete("txnid");
    setSearchParams(searchParams, { replace: true });

    if(isPlanValid?.isPlanValid){
       navigate("/vehicle-amc");
    }

  };

  const handleSuccessClose = () => {
    localStorage.removeItem("selectedVehicleData");
    clearFilter();
    setShowPopup(null);
    setVehicle(null);
    setPlans([]);
    searchParams.delete("status");
    searchParams.delete("txnid");
    setSearchParams(searchParams, { replace: true });
  };

  const handleChangeVehicle = () => {
    setIsSelectVehicleOpen(true);
  };

  const handleVehicleSelect = (selectedVehicle) => {
    setVehicle(selectedVehicle);
    setIsSelectVehicleOpen(false);
    
    const saved = localStorage.getItem("selectedVehicleData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        parsed.vehicle = selectedVehicle;
        localStorage.setItem("selectedVehicleData", JSON.stringify(parsed));
      } catch (e) {}
    }
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
      <section className="bg-[#172E53] text-white w-full py-6 sm:py-8 md:py-10 lg:py-12 text-center">
        <div className="max-w-[600px] text-center mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          <h2 className="md:text-3xl font-semibold text-2xl">Selected AMC isn’t supported for your vehicle. Please choose a valid AMC from the list.</h2>
          <p className="mt-2 sm:mt-3 md:mt-4 flex justify-center sm:text-[17px]">
            <Button
              onClick={handleChangeVehicle}
              className="flex items-center gap-1 px-1 py-0 bg-[#EFEFEF] text-[#333333] text-xs rounded-full border border-gray-200 hover:bg-gray-200 transition-all mb-4"
            >
              <span className="flex items-center justify-center">
                <Edit size={12} className="text-[#242424]" />
              </span>
              <span className="text-xs text-[#333333] ">Change Vehicle</span>
            </Button>
          </p>
        </div>
      </section>
      <Suspense fallback={<CardLoader />}>
        <div className="mt-10"/>
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
          <PlanSummaryAndBuy
            isOpen={isPopupOpen}
            plan={selectedPlanState}
            onClose={handleClosePopup}
            onBack={handleClosePopup}
            vehicle={vehicle}
          />
        </Suspense>
      )}

      {showPopup === "success" && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <Suspense fallback={<div className="text-white">Loading...</div>}>
            {/* <SuccessPurchase
              onClose={handleSuccessClose}
              purchaseData={selectedPlanState}
            /> */}
            <FinalDetailsPopup onClose={handleSuccessClose} plan={selectedPlan}vehicle={vehicle} purchaseData={selectedPlanState} calledFrom={'vehicle amc filtr'} />
          </Suspense>
        </div>
      )}

      {showPopup === "failed" && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <Suspense fallback={<div className="text-white">Loading...</div>}>
            <FailedPurchase
              reason="Your UPI payment was not completed or cancelled."
              onClose={handleClosePaymentPopup}
              error={error}
              errorCode={errorCode}
              errorReason={errorReason}
            />
          </Suspense>
        </div>
      )}

      {isSelectVehicleOpen && (
        <Suspense fallback={null}>
          <SelectVehicle
            isOpen={isSelectVehicleOpen}
            onClose={() => setIsSelectVehicleOpen(false)}
            onBack={() => setIsSelectVehicleOpen(false)}
            onSelect={handleVehicleSelect}
          />
        </Suspense>
      )}
    </section>
  );
};

export default VehicleAmcFilter;
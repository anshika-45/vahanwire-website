import React, { useState, useEffect, Suspense } from "react";
import { useAuth } from "../context/AuthContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyPayment } from "../api/paymentApi";
import BreadcrumbBar from "../components/BreadcrumbBar";
import AMC from "../components/AMC";
import useAmcData from "../hooks/useAmcData";
const AmcTabs = React.lazy(() => import("../components/AmcTabs"));
const AmcCard = React.lazy(() => import("../components/AmcCard"));
const CompareTable = React.lazy(() => import("../components/CompareTable"));
const LatestOffer = React.lazy(() => import("../components/LatestOffer"));
const AmcBanner = React.lazy(() => import("../components/AmcBanner"));
const AddBanner = React.lazy(() => import("../components/AddBanner"));
const PlanSummaryPage = React.lazy(() => import("../popup/PlanSummaryPage"));
const SuccessPurchase = React.lazy(() => import("../popup/SuccessPurchase"));
const FailedPurchase = React.lazy(() => import("../popup/FailedPurchase"));
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
  const { setIsLoggedIn } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { vehicleType, setVehicleType, amcType, setAmcType, getAmcTabs, comparePlans, features } = useAmcData();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const status = searchParams.get("status");
  const txnid = searchParams.get("txnid");
  useEffect(() => {
    setIsLoggedIn(true);
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [setIsLoggedIn]);
  useEffect(() => {
    const handlePaymentStatus = async () => {
      if (status === "success" && txnid) {
        setIsVerifying(true);
        try {
          const res = await verifyPayment(txnid);
          if (res?.success && res?.data?.transaction?.status === "success") {
            setShowPopup("success");
          } else {
            setShowPopup("failed");
          }
        } catch (err) {
          console.error("Verification error:", err);
          setShowPopup("failed");
        } finally {
          setIsVerifying(false);
        }
      } else if (status === "failed") {
        setShowPopup("failed");
      }
    };
    handlePaymentStatus();
  }, [status, txnid]);
  const handleBuyNow = (plan) => {
    setSelectedPlan(plan);
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setSelectedPlan(null);
    setIsPopupOpen(false);
  };
  const handleClosePaymentPopup = () => {
    setShowPopup(null);
    navigate("/", { replace: true });
  };
  const handleRetry = () => {
    setShowPopup(null);
    navigate("/plans", { replace: true });
  };
  return (
    <section className="bg-white w-full min-h-screen">
      <BreadcrumbBar />
      <AMC vehicleType={vehicleType} setVehicleType={setVehicleType} isFilter={true} />
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
        <AmcCard vehicleType={vehicleType} onBuy={handleBuyNow} />
      </Suspense>
      <Suspense fallback={<TableLoader />}>
        <CompareTable plans={comparePlans} features={features} onBuyNow={handleBuyNow} />
      </Suspense>
      <Suspense fallback={<BannerLoader />}>
        <LatestOffer />
      </Suspense>
      <div className="flex flex-col space-y-10">
        <Suspense fallback={<BannerLoader />}>
          <AmcBanner onBuy={handleBuyNow} />
        </Suspense>
        
        <Suspense fallback={<BannerLoader />}>
          <AddBanner />
        </Suspense>
      </div>
      {isPopupOpen && (
        <Suspense fallback={null}>
          <PlanSummaryPage isOpen={isPopupOpen} plan={selectedPlan} onClose={handleClosePopup} />
        </Suspense>
      )}

      {isVerifying && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-xl">Verifying your payment...</div>
        </div>
      )}

      {showPopup === "success" && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <Suspense fallback={<div className="text-white">Loading...</div>}>
            <SuccessPurchase onClose={handleClosePaymentPopup} />
          </Suspense>
        </div>
      )}

      {showPopup === "failed" && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <Suspense fallback={<div className="text-white">Loading...</div>}>
            <FailedPurchase
              reason="Your UPI payment was not completed or cancelled."
              onClose={handleClosePaymentPopup}
              onRetry={handleRetry}
            />
          </Suspense>
        </div>
      )}
    </section>
  );
};

export default VehicleAmcFilter;
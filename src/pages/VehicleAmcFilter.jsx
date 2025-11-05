import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyPayment } from "../api/paymentApi";
import BreadcrumbBar from "../components/BreadcrumbBar";
import AMC from "../components/AMC";
import AmcTabs from "../components/AmcTabs";
import AmcCard from "../components/AmcCard";
import CompareTable from "../components/CompareTable";
import LatestOffer from "../components/LatestOffer";
import AmcBanner from "../components/AmcBanner";
import AddBanner from "../components/AddBanner";
import PlanSummaryPage from "../popup/PlanSummaryPage";
import SuccessPurchase from "../popup/SuccessPurchase";
import FailedPurchase from "../popup/FailedPurchase";
import useAmcData from "../hooks/useAmcData";

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
      <AmcTabs amcType={amcType} setAmcType={setAmcType} showRemoveFilter tabs={getAmcTabs} vehicleType={vehicleType} />
      <AmcCard vehicleType={vehicleType} onBuy={handleBuyNow} />
      <CompareTable plans={comparePlans} features={features} onBuyNow={handleBuyNow} />
      <LatestOffer />
      <div className="flex flex-col space-y-10">
        <AmcBanner onBuy={handleBuyNow} />
        <AddBanner />
      </div>

      {isPopupOpen && (
        <PlanSummaryPage isOpen={isPopupOpen} plan={selectedPlan} onClose={handleClosePopup} />
      )}

      {isVerifying && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-xl">Verifying your payment...</div>
        </div>
      )}

      {showPopup === "success" && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <SuccessPurchase onClose={handleClosePaymentPopup} />
        </div>
      )}

      {showPopup === "failed" && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <FailedPurchase
            reason="Your UPI payment was not completed or cancelled."
            onClose={handleClosePaymentPopup}
            onRetry={handleRetry}
          />
        </div>
      )}
    </section>
  );
};

export default VehicleAmcFilter;
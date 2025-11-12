import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Payment from "./Payment";
import { initiatePayment } from "../api/paymentApi";
import coupon from "../assets/coupon.png"; 
import ViewCoupons from "./ViewCoupons";
const SuccessPurchase = React.lazy(() => import("./SuccessPurchase"));

const PlanSummaryPage = ({ isOpen, onClose, onBack, plan, user, vehicle }) => {
  const [currentView, setCurrentView] = useState("summary");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [viewCouponOpen, setViewCouponOpen] = useState(false);

  const handleViewCoupon = () => {
    setViewCouponOpen(!viewCouponOpen);
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentView("summary");
      setPaymentData(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (currentView === "success") {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [currentView]);

  const planDetails = {
    title: plan?.title || "AMC Plan",
    price: `₹${plan?.price?.toLocaleString() || "0"}`,
    note: `*Your plan is valid for ${plan?.validFor || "N/A"}.`,
  };

  const stats = [
    { label: "Service", value: "Unlimited" },
    { label: "Validity", value: "365 Days" },
    { label: "Plan Start After", value: "48 Hours" },
  ];

  const features = [
    { label: "Flat Tyre (Tube)" },
    { label: "Flat Tyre (Tubeless)" },
    { label: "Battery Jumpstart" },
    { label: "Custody Service" },
    { label: "Key Unlock Assistance" },
    { label: "Fuel Delivery" },
    { label: "Starting Problem" },
  ];

  const amount = plan?.price || 0;
  const discount = 100;
  const subtotal = amount - discount;
  const gstRate = 0.18;
  const gstAmount = subtotal * gstRate;
  const total = Math.round(subtotal + gstAmount);

  const billing = [
    { label: "Items", value: "1" },
    { label: "Amount", value: `₹${amount.toLocaleString()}` },
    { label: "Discount", value: `-₹${discount}` },
    { label: "GST (18%)", value: `₹${Math.round(gstAmount).toLocaleString()}` },
  ];

  const handleProceedToPayment = async () => {
    if (!plan?._id) {
      alert("Plan information is incomplete. Missing ID or price.");
      return;
    }

    if (!vehicle?.vehicleNumber) {
      alert("Vehicle information is missing. Please select a vehicle.");
      return;
    }

    setIsLoading(true);
    try {
      const paymentResponse = await initiatePayment({
        planId: plan._id,
        vehicleNumber: vehicle.vehicleNumber,
      });

      if (paymentResponse.success) {
        setPaymentData(paymentResponse.data);
        setCurrentView("payment");
      } else {
        alert(paymentResponse.message || "Failed to initiate payment");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setCurrentView("success");
  };

  const handlePaymentBack = () => {
    setCurrentView("summary");
    setPaymentData(null);
  };

  const renderContent = () => {
    if (currentView === "payment") {
      return (
        <Payment
          onBack={handlePaymentBack}
          onPaymentSuccess={handlePaymentSuccess}
          paymentData={paymentData}
          plan={plan}
          vehicle={vehicle}
        />
      );
    }

    if (currentView === "success") {
      return <SuccessPurchase onClose={onClose} plan={plan} />;
    }

    return (
      <div className="flex flex-col gap-6">
        <div className="bg-[#266DDF] text-white text-md rounded-lg mt-1 px-4 py-3">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{planDetails.title}</h2>
              <p className="text-xs mt-1 opacity-90">{planDetails.note}</p>
            </div>
            <div className="text-right font-semibold text-xl">
              {planDetails.price}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 ">
          {stats.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-left justify-left w-[160px] border border-[#BCD2F5] rounded-xl py-3 px-3 bg-white"
            >
              <p className="text-[#242424] text-xs">{item.label}</p>
              <p className="font-semibold text-md text-[#242424] mt-1">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border-0.5 border-[#BCD2F5] overflow-hidden">
          <div className="flex justify-between items-center px-8 py-4 border-[#BCD2F5] border-0.5 text-[#242424] font-bold text-base">
            <span>Number of Service Per Year</span>
            <span className="mr-12">Unlimited</span>
          </div>

          {features.map((feature, i) => (
            <div
              key={i}
              className={`flex justify-between items-center px-8 py-3 border-[#BCD2F5] border-t-1 ${
                i % 2 === 0 ? "bg-[#F8F8F8]" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-2 text-[#242424] text-base font-semibold">
                <span>{feature.label}</span>
              </div>
              <div className="w-5 h-5 rounded-full bg-[#21830F] flex items-center justify-center mr-20">
                <Check size={13} className="text-white" />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl px-6 py-5 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3 text-2xl">
            Have a Discount Coupon?
          </h3>

          <p className="text-sm text-[#242424] mb-2">Enter Code</p>

          <div className="bg-[#F8F8F8] rounded-lg px-4 py-3 flex justify-between items-center border border-[#94b6ed]">
            <div className="flex flex-col gap-[2px]">
              <p className="flex items-center gap-2 text-[#242424] text-md font-bold">
                <img src={coupon} alt="coupon icon" className="w-5 h-5 object-contain" />
                Get a CashBack with...
              </p>

              <button
                onClick={handleViewCoupon}
                className="text-[#266DDF] cursor-pointer"
              >
                view all coupons &gt;
              </button>
              {viewCouponOpen && (
                <div className="fixed top-0 bottom-0 min-w-screen left-0 right-0 min-h-screen bg-black/50 z-40 flex justify-center items-center">
                  <ViewCoupons handleClick={handleViewCoupon} />
                </div>
              )}
            </div>

            <button
              className="
                text-[#266DDF]
                border border-[#266DDF]
                px-6 py-2
                rounded-lg
                font-medium
                text-sm
                bg-transparent
                hover:bg-[#266DDF]
                hover:text-white
                transition
              "
            >
              Apply
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl overflow-hidden mb-20">
          <div className="px-6 py-5">
            <h3 className="font-semibold text-[#333333] mb-4 text-2xl">
              Billing Details
            </h3>
            {billing.map((item, i) => (
              <div
                key={i}
                className="flex justify-between py-2 text-[#555555] text-base"
              >
                <span>{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center py-4 px-6 bg-[#E9F0FC] text-black">
            <span className="text-xl">Total Payable</span>
            <span className="text-xl">₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  };

  if (currentView === "success") {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <SuccessPurchase onClose={onClose} plan={plan} />
      </React.Suspense>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onBack={currentView === "payment" ? handlePaymentBack : onBack}
      proceedButton={
        currentView === "summary" ? (
          <Button
            text={isLoading ? "Processing..." : "Proceed to Payment"}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg disabled:bg-blue-400"
            onClick={handleProceedToPayment}
            disabled={isLoading}
          />
        ) : null
      }
    >
      {renderContent()}
    </Modal>
  );
};

export default PlanSummaryPage;
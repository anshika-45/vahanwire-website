import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import detailIcon from "../assets/info-circle.webp";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Payment from "./Payment";
import { initiatePayment } from "../api/paymentApi";
import { toast } from "react-toastify";
const SuccessPurchase = React.lazy(() => import("./SuccessPurchase"));

const PlanSummaryPage = ({ isOpen, onClose, onBack, plan, user, vehicle }) => {
  const [currentView, setCurrentView] = useState("summary");
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

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
    {
      label: "Flat Tyre (Tube)",
      details:
        "Emergency roadside assistance for flat tyre replacement with tube-type tyres. Includes tyre changing and basic repairs.",
    },
    {
      label: "Flat Tyre (Tubeless)",
      details:
        "Emergency roadside assistance for flat tyre replacement with tubeless tyres. Includes tyre changing and basic repairs.",
    },
    {
      label: "Battery Jumpstart",
      details:
        "On-site battery jumpstart service when your vehicle battery is dead. Includes battery testing and jumpstart assistance.",
    },
    {
      label: "Custody Service",
      details:
        "Vehicle custody and secure parking services when you need to leave your vehicle temporarily for repairs or other reasons.",
    },
    {
      label: "Key Unlock Assistance",
      details:
        "Emergency key unlock service if you lock your keys inside the vehicle. Professional locksmith assistance.",
    },
    {
      label: "Fuel Delivery",
      details:
        "Emergency fuel delivery service when you run out of fuel. Up to 5 liters of fuel delivered to your location.",
    },
    {
      label: "Starting Problem",
      details:
        "Assistance for vehicle starting issues including battery problems, starter motor issues, and basic electrical diagnostics.",
    },
  ];

  const billing = [
    { label: "Amount", value: `₹${plan?.price || "0"}` },
    { label: "Items", value: "1" },
    { label: "Amount", value: "₹100" },
    { label: "Discount", value: "-₹100" },
    { label: "Subtotal", value: "₹899" },
    { label: "GST (18%)", value: "₹161.82" },
  ];

  const total = plan?.price;

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
          <div className="flex justify-between px-8 py-3 border-[#BCD2F5] border-0.5 text-[#242424] font-semibold text-md mr-15">
            <span>Number of Service Per Year</span>
            <span>Unlimited</span>
          </div>

          {features.map((feature, i) => (
            <div
              key={i}
              className={`flex justify-between items-center px-8 py-3 border-[#BCD2F5] border-t-1 ${
                i % 2 === 0 ? "bg-[#F8F8F8]" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-2 text-[#242424] text-sm font-medium">
                <span>{feature.label}</span>
                <div
                  className="relative inline-block"
                  onMouseEnter={() => setHoveredIcon(i)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  <img
                    src={detailIcon}
                    alt="Details"
                    loading="lazy"
                    className="w-5 h-5 cursor-pointer"
                    width={20}
                    height={20}
                    decoding="async"
                  />
                  {hoveredIcon === i && (
                    <div
                      className={`absolute left-8 bg-[#F7FAFF] border-1 border-[#c9dcfd] text-black text-xs px-4 py-4 rounded-lg z-50 w-64 ${
                        i > 3 ? "top-[-6rem]" : "top-0"
                      }`}
                    >
                      <h5 className="text-center font-bold text-sm mb-2">
                        {feature.label}
                      </h5>
                      <p className="text-center">{feature.details}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-4 h-4 rounded-full bg-[#21830F] flex items-center justify-center mr-20">
                <Check size={12} className="text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* ===== Coupon Section ===== */}
        <div className="bg-white rounded-xl px-6 py-5 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3 text-2xl">
            Have a Discount Coupon?
          </h3>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-700">Get a CashBack with...</p>
              <p className="text-[#266DDF] cursor-pointer">
                view all coupons &gt;
              </p>
              <div className="border-t border-dashed border-gray-300 mt-2"></div>
            </div>
          </div>
          <div className="flex gap-2">
            <label htmlFor="coupon-code" className="sr-only">
              Coupon Code
            </label>
            <input
              id="coupon-code"
              type="text"
              placeholder="Enter coupon code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700"
            />
            <Button
              text="Apply"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700"
            />
          </div>
        </div>

        {/* ===== Billing Section ===== */}
        <div className="bg-white rounded-xl px-6 py-5 mb-20">
          <h3 className="font-semibold text-[#333333] mb-2 text-2xl">
            Billing Details
          </h3>
          {billing.map((item, i) => (
            <div
              key={i}
              className="flex justify-between py-1 text-[#333333] text-md"
            >
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
          ))}
          <div className="flex justify-between py-3 mt-3 text-xl font-bold text-[#333333] px-2 rounded">
            <span>Total Payable</span>
            <span>₹{total}</span>
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

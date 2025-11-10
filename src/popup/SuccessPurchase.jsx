import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import successImage from "../assets/success.png";

const SuccessPurchase = ({ onClose, purchaseData }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    // Add to context if purchaseData exists
    if (purchaseData && onClose) {
      onClose(purchaseData);
    }
    // Navigate to MyAMCPage
    navigate("/my-account?view=amc");
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-2xl mx-auto">
        <div className="flex items-center gap-6 md:gap-8">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Thank You for Your Purchase!
            </h2>
            <p className="text-gray-600 mb-8 text-sm">
              Your AMC Plan is active — enjoy a year of worry-free service
              and priority support.
            </p>
            <Button
              text="Close"
              className="px-15 py-3 bg-white border text-[#266DDF] font-semibold rounded-lg hover:bg-blue-700 hover:text-white transition"
              onClick={handleClose}
            />
          </div>
          <div className="flex-shrink-0">
            <img
              src={successImage}
              alt="Purchase successful checkmark illustration"
              loading="lazy"
              decoding="async"
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPurchase;

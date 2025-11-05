import React from "react";
import Button from "../components/Button";
import successIcon from "../assets/successpurchase.png";

const SuccessPurchase = ({ onClose }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto">
      <img
        src={successIcon}
        alt="Payment Success"
        className="w-30 h-30 mb-6 mx-auto"
      />
      <h2 className="text-3xl font-bold text-gray-800 mb-3">
        Payment Successful
      </h2>
      <p className="text-gray-600 mb-8 text-sm leading-relaxed">
        Your payment has been processed successfully.
      </p>
      <Button
        text="Close"
        className="px-6 py-3 bg-[#266DDF] text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        onClick={onClose}
      />
    </div>
  );
};

export default SuccessPurchase;
import React from "react";
import { Check } from "lucide-react";

const SuccessPurchase = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-green-500 rounded-full p-4">
            <Check size={40} className="text-white" strokeWidth={3} />
          </div>
        </div>
        <h4 className="text-xl font-bold text-black-800 mb-4">
          Thank You for Your Purchase!
        </h4>
        <p className="text-gray-600 text-base mb-8 leading-relaxed">
          Your AMC Plan is active — enjoy a year of worry-free service and priority support.
        </p>
        <button
          onClick={onClose}
          className="w-full max-w-xs mx-auto px-6 py-3 bg-white border border-gray-400 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessPurchase;

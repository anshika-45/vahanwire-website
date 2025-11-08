import React from "react";
import { CheckCircle } from "lucide-react";
import Button from "../components/Button";

const SuccessPurchase = ({ onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto">
        <CheckCircle
          size={70}
          className="text-white fill-green-500 mb-8 justify-between ml-35"
          aria-label="Payment Successful"
        />
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Thank You for Your Purchase!
        </h2>
        <p className="text-gray-600 mb-8 text-sm">
          Your AMC Plan is active — enjoy a year of worry<br></br>-free service
          and priority support.
        </p>
        <Button
          text="Close"
          className="px-15 py-3 bg-white border text-[#266DDF] font-semibold rounded-lg hover:bg-blue-700 hover:text-white transition"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default SuccessPurchase;

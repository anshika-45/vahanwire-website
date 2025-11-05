import React from "react";
import Button from "../components/Button";
import failureIcon from "../assets/failedpurchase.png";

const FailedPurchase = ({ onClose, reason }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto">
        <img
          src={failureIcon}
          alt="Payment Failed"
          className="w-30 h-30 mb-6 mx-auto"
        />

        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Failed
        </h2>

        <p className="text-gray-600 mb-8 text-sm leading-relaxed">
          We couldn’t complete your payment.{" "}
          {reason ? (
            <>
              <br />
              <span className="text-red-500 font-medium">Reason:</span> {reason}
            </>
          ) : (
            "Please try again or use a different payment method."
          )}
        </p>

        <div className="flex items-center justify-center">
          <Button
            text="Close"
            className="px-6 py-3 bg-white border text-[#266DDF] font-semibold rounded-lg hover:bg-blue-700 hover:text-white transition"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default FailedPurchase;

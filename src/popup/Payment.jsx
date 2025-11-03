import React from "react";
import Button from "../components/Button";

const Payment = ({ onPaymentSuccess }) => {
  return (
    <div className="flex flex-col gap-6 mt-4">
      {/* ===== Layout Wrapper ===== */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* ===== Left Section - Price Info ===== */}
        <div className="w-full md:w-1/3 border border-gray-200 rounded-lg p-6 bg-gray-50">
          <div className="flex items-center gap-3 mb-6">
            <div>
              <p className="font-semibold text-gray-800 text-lg">Vahanwire</p>
              <p className="text-gray-500 text-sm">Payable Now</p>
            </div>
          </div>

          <p className="text-2xl font-bold text-gray-800 mb-8">₹999</p>

          <p className="text-xs text-gray-500 flex items-center gap-1">
            <span role="img" loading="lazy" aria-label="lock">🔒</span> Secure Checkout
          </p>

          <p className="text-[11px] text-gray-400 mt-2 leading-snug">
            Transaction ID:{" "}
            <span className="font-medium">#16b64318239485b5a9</span>
          </p>
        </div>

        {/* ===== Right Section - Payment Options ===== */}
        <div className="w-full md:w-2/3">
          <h2 className="text-gray-800 font-semibold text-lg mb-4">
            All Payment Options
          </h2>

          <div className="space-y-3">
            {[
              "Net Banking",
              "Cards (Credit/Debit)",
              "Wallet",
              "UPI",
              "Pay By Rewards",
            ].map((option, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-blue-400 cursor-pointer transition"
              >
                <span className="text-gray-700 font-medium">{option}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Proceed Button ===== */}
      <div className="mt-8 mb-20">
        <Button
          text="Proceed to Payment"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
          onClick={onPaymentSuccess}
        />
      </div>
    </div>
  );
};

export default Payment;

import React from "react";

const features = [
  { label: "Flat Tyre (Tube)", qty: "10", left: "8" },
  { label: "Flat Tyre (Tubeless)", qty: "Unlimited", left: "Unlimited" },
  { label: "Battery Jumpstart", qty: "Unlimited", left: "Unlimited" },
  { label: "Custody Service", qty: "12", left: "4" },
  { label: "Key Unlock Assistance", qty: "Unlimited", left: "Unlimited" },
  { label: "Fuel Delivery", qty: "Unlimited", left: "Unlimited" },
  { label: "Starting Problem", qty: "Unlimited", left: "Unlimited" },
];

export default function ServiceCoverageDetails({ isOpen, onClose, plan }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-3 md:p-4 bg-black/40 ">
      <div className="w-full max-w-sm md:max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-[#E9F0FC] relative">
          <h2 className="absolute left-1/2 -translate-x-1/2 text-sm md:text-base font-semibold text-[#333]">
            Service Coverage Details
          </h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="ml-auto text-[#242424] hover:text-slate-700 text-lg md:text-xl"
          >
            ✕
          </button>
        </div>

        {/* Description */}
        <div className="px-4 md:px-6 pt-4 md:pt-6 mb-3 md:mb-4">
          <h3 className="text-xs md:text-sm font-semibold">
            Vahanwire Premium Care
          </h3>
          <p className="text-xs text-[#333] mt-1 leading-snug">
            Experience essential car care with unmatched value through the Gold Member Card.
            Designed for everyday peace of mind, it includes key services like puncture repairs,
            car washes, jump-start support...
          </p>
        </div>

        {/* Plan Info */}
        <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 px-4 md:px-6">
          <div className="p-2 md:p-3 border border-[#BCD2F5] rounded-md bg-white text-xs">
            <div className="text-gray-500">Service</div>
            <div className="font-medium text-sm">{plan?.service || "Unlimited"}</div>
          </div>
          <div className="p-2 md:p-3 border border-[#BCD2F5] rounded-md bg-white text-xs">
            <div className="text-gray-500">Validity</div>
            <div className="font-medium text-sm">{plan?.validity || "207 Days"}</div>
          </div>
        </div>

       
        <div className="mx-4 md:mx-6 mb-5 border border-[#E9F0FC] rounded-lg overflow-hidden">
          <div className="grid grid-cols-3 bg-[#F8F8F8] text-[#242424] text-xs md:text-sm border-b border-[#E9F0FC] font-semibold">
            <div className="px-3 py-3 text-left">Service Package</div>
            <div className="px-3 py-3 text-center">QTY</div>
            <div className="px-3 py-3  text-center">Left</div>
          </div>

          {features.map((item, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 items-center text-xs md:text-sm border-t border-[#E9F0FC] ${
                i % 2 === 0 ? "bg-white" : "bg-[#F8F8F8]"
              }`}
            >
              <div className="px-3 py-3 text-left text-[#242424] font-normal">
                {item.label}
              </div>
              <div className="px-3 py-3 text-center text-[#242424] font-normal">
                {item.qty}
              </div>
              <div className="px-3 py-3 text-center text-[#242424] font-normal">
                {item.left}
              </div>
            </div>
          ))}


          <div className="grid grid-cols-3 font-semibold bg-[#E9F0FC] text-[#242424] text-xs md:text-sm border-t border-[#E9F0FC] ">
            <div className="px-3 py-2 text-left">Total Services</div>
            <div className="px-3 py-2 text-center">22</div>
            <div className="px-3 py-2 text-center">12</div>
          </div>
        </div>
      </div>
    </div>
  );
}

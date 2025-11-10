import React, { useState } from "react";
import detailIcon from "../assets/info-circle.webp";

const features = [
  { label: "Flat Tyre (Tube)", qty: "10", left: "8", details: "Emergency roadside assistance for flat tyre replacement with tube-type tyres. Includes tyre changing and basic repairs." },
  { label: "Flat Tyre (Tubeless)", qty: "Unlimited", left: "Unlimited", details: "Emergency roadside assistance for flat tyre replacement with tubeless tyres. Includes tyre changing and basic repairs." },
  { label: "Battery Jumpstart", qty: "Unlimited", left: "Unlimited", details: "On-site battery jumpstart service when your vehicle battery is dead. Includes battery testing and jumpstart assistance." },
  { label: "Custody Service", qty: "12", left: "4", details: "Vehicle custody and secure parking services when you need to leave your vehicle temporarily for repairs or other reasons." },
  { label: "Key Unlock Assistance", qty: "Unlimited", left: "Unlimited", details: "Emergency key unlock service if you lock your keys inside the vehicle. Professional locksmith assistance." },
  { label: "Fuel Delivery", qty: "Unlimited", left: "Unlimited", details: "Emergency fuel delivery service when you run out of fuel. Up to 5 liters of fuel delivered to your location." },
  { label: "Starting Problem", qty: "Unlimited", left: "Unlimited", details: "Assistance for vehicle starting issues including battery problems, starter motor issues, and basic electrical diagnostics." },
];

export default function ServiceCoverageDetails({ isOpen, onClose, plan }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-3 md:p-4 bg-black/40">
      <div className="w-full max-w-sm md:max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-[#E9F0FC] relative">
          <h2 className="absolute left-1/2 -translate-x-1/2 text-sm md:text-base font-semibold text-[#333333]">
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

        {/* Intro */}
        <div className="px-4 md:px-6 pt-6 md:pt-10 mb-4 md:mb-6">
          <h3 className="text-xs md:text-sm font-semibold">Vahanwire Premium Care</h3>
          <p className="text-xs md:text-sm text-[#333333] mt-1 leading-relaxed">
            Experience essential car care with unmatched value through the Gold Member Card.
            Designed for everyday peace of mind, it includes key services like puncture repairs, car washes, jump-start support...
          </p>
        </div>

        {/* Top info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 px-4 md:px-6">
          <div className="p-3 border border-[#BCD2F5] rounded-md bg-white text-xs md:text-sm">
            <div className="text-gray-500">Service</div>
            <div className="font-medium">{plan?.service || "Unlimited"}</div>
          </div>
          <div className="p-3 border border-[#BCD2F5] rounded-md bg-white text-xs md:text-sm">
            <div className="text-gray-500">Validity</div>
            <div className="font-medium">{plan?.validity || "207 Days"}</div>
          </div>
        </div>

        {/* Table */}
        <div className="mx-4 md:mx-6 mb-6 border border-[#E9F0FC] rounded-lg overflow-hidden">
          {/* Head */}
          <div className="grid grid-cols-3 bg-[#F8F8F8] text-[#242424] text-xs md:text-sm border-b border-[#E9F0FC]">
            <div className="px-4 py-2 text-left font-semibold">Service Package</div>
            <div className="px-4 py-2 text-center font-semibold">QTY</div>
            <div className="px-4 py-2 text-center font-semibold">Left</div>
          </div>

          {/* Rows */}
          {features.map((item, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 items-center text-xs md:text-sm border-t border-[#E9F0FC] ${
                i % 2 === 0 ? "bg-white" : "bg-[#F8F8F8]"
              }`}
            >
              {/* Col 1: centered label + info icon */}
              <div className="px-4 py-3 relative flex items-center justify-start gap-1 text-left  font-semibold text-[#242424]">
                <span>{item.label}</span>
                <img
                  src={detailIcon}
                  alt="Details"
                  loading="lazy"
                  className="w-4 h-4 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                {hoveredIndex === i && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-8 z-50 bg-[#F7FAFF] border border-[#c9dcfd] rounded-lg p-3 w-64 shadow-lg">
                    <h5 className="font-semibold text-center mb-1 text-sm">{item.label}</h5>
                    <p className="text-[11px] text-center">{item.details}</p>
                  </div>
                )}
              </div>

              {/* Col 2: centered qty */}
              <div className="px-4 py-3 flex justify-center items-center text-center font-semibold text-[#242424]">
                {item.qty}
              </div>

              {/* Col 3: centered left */}
              <div className="px-4 py-3 flex justify-center items-center text-center font-semibold text-[#242424]">
                {item.left}
              </div>
            </div>
          ))}

          {/* Footer row */}
          <div className="grid grid-cols-3 bg-[#F8F8F8] text-[#242424] border-t border-[#E9F0FC]">
            <div className="px-4 py-3 text-left font-semibold">Total Services</div>
            <div className="px-4 py-3 text-center font-semibold">22</div>
            <div className="px-4 py-3 text-center font-semibold">12</div>
          </div>
        </div>
      </div>
    </div>
  );
}

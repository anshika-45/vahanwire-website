import React from "react";
import detailIcon from "../assets/info-circle.webp";
import checkIcon from "../assets/circle-check-filled.webp";
export default function ServiceCoverageDetails({ isOpen, onClose, plan }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-2 md:p-4 bg-black/40">
      <div className="w-full max-w-sm md:max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-[#E9F0FC]">
          <h2 className="absolute left-1/2 -translate-x-1/2 text-sm md:text-base font-semibold text-[#333333]">
            Service Coverage
          </h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="ml-auto text-[#242424] hover:text-slate-700 text-lg md:text-xl"
          >
            ✕
          </button>
        </div>
        <div className="mb-6 md:mb-10 px-4 md:px-6 pt-6 md:pt-10">
          <h3 className="text-xs md:text-sm font-semibold">Vahanwire Premium Care</h3>
          <p className="text-xs md:text-sm text-[#333333] mt-1 leading-relaxed">Experience essential car care with unmatched value through the Gold Member Card. Designed for everyday peace of mind, it includes key services like puncture repairs, car washes, jump-start support...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6 text-left px-4 md:px-6">
          <div className="p-2 md:p-3 border-1 border-[#BCD2F5] rounded text-xs md:text-sm bg-[#FFFFFF]">
            <div className="text-gray-500 text-xs">Service</div>
            <div className="font-medium text-xs md:text-sm">{plan.service}</div>
          </div>
          <div className="p-2 md:p-3 border-1 border-[#BCD2F5] rounded text-xs md:text-sm bg-[#FFFFFF]">
            <div className="text-gray-500 text-xs">Validity</div>
            <div className="font-medium text-xs md:text-sm">{plan.validity}</div>
          </div>
          <div className="p-2 md:p-3 border-1 border-[#BCD2F5] rounded text-xs md:text-sm bg-[#FFFFFF]">
            <div className="text-gray-500 text-xs">Plan Start After</div>
            <div className="font-medium text-xs md:text-sm">{plan.startAfter}</div>
          </div>
        </div>
        <div className="border-[#E9F0FC] border-1 rounded-sm m-3 md:m-5 overflow-x-auto text-xs md:text-sm">
          <div className="flex justify-between items-center p-2 md:p-3 bg-[#F8F8F8] font-semibold text-[#242424] border-b border-[#E9F0FC] min-w-max md:min-w-full">
            <div className="w-40 md:w-56">No. of services per year</div>
            <div className="w-24 md:w-32 text-center">Unlimited</div>
          </div>
          {plan.services.map((s, i) => (
            <div
              key={i}
              className={`flex justify-between items-center p-2 md:p-3 border-b border-[#E9F0FC] min-w-max md:min-w-full ${
                i % 2 === 0 ? "bg-[#FFFFFF]" : "bg-[#F8F8F8]"
              }`}
            >
              <div className="flex-1 flex items-center gap-1 md:gap-2 w-40 md:w-56 truncate">
                <span className="text-xs md:text-sm truncate">{s.name}</span>
                <img src={detailIcon} loading="lazy" alt="detail" className="w-3 md:w-4 h-3 md:h-4 flex-shrink-0" />
              </div>
              <div className="w-24 md:w-32 text-right flex justify-end items-center gap-1">
                <img src={checkIcon} loading="lazy" alt="check" className="w-4 md:w-5 h-4 md:h-5 flex-shrink-0" />
                <span className="text-xs md:text-sm">{s.unlimited}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
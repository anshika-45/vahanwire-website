import React from "react";
import { Download } from "lucide-react";

const MyAMCCard = ({ plan, vehicle, validity, bgColor, logoSrc, carImageSrc, onDownloadInvoice }) => {
  // carImageSrc can be either car or bike image based on purchase
  return (
    <div className="flex flex-col items-center w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] mx-auto">
      {/* Top Section */}
      <div
        className={`${bgColor} rounded-t-xl p-3 sm:p-4 md:p-6 w-full relative overflow-visible min-h-[170px] sm:min-h-[200px] md:min-h-[230px]`}
      >
        {/* Logo Bubble */}
        <div className="absolute left-0 top-3 sm:top-4 bg-white rounded-r-full w-12 sm:w-14 md:w-16 h-10 sm:h-12 md:h-14 flex items-center justify-end pr-2 sm:pr-3 shadow-md z-10">
          <img
            src={logoSrc || "/src/assets/Logo1.webp"}
            alt="VahanWire Logo"
            loading="lazy"
            className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 object-contain"
          />
        </div>

        {/* Car + Background Logo */}
        <div className="relative flex justify-end items-start pr-2 mt-1 sm:mt-2">
          <img
            src="/src/assets/back-logo.webp"
            alt="Background decorative logo"
            loading="lazy"
            className="absolute right-4 sm:right-6 -top-16 sm:-top-12 md:-top-8 w-24 sm:w-28 md:w-32 opacity-60 pointer-events-none"
          />
          <img
            src={carImageSrc || "/src/assets/CarAMC.webp"}
            alt="Vehicle image"
            loading="lazy"
            className="relative z-10 w-14 sm:w-18 md:w-22 object-contain"
          />
        </div>

        {/* Plan Title */}
        <h3 className="text-white text-sm sm:text-base md:text-xl font-bold mt-4 sm:mt-5 line-clamp-1">
          {plan}
        </h3>

        {/* Vehicle & Validity Info */}
        <div className="flex justify-between text-white mt-3 sm:mt-4">
          <div>
            {vehicle && <div className="text-xs opacity-80">Vehicle Number</div>}
            <div className="text-sm sm:text-base font-semibold tracking-wide">{vehicle}</div>
          </div>
          <div className="text-right">
            {validity && <div className="text-xs opacity-80">Valid For</div>}
            <div className="text-sm sm:text-base font-semibold">{validity}</div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full bg-gray-100 rounded-b-xl py-2 sm:py-3 md:py-3 px-3 sm:px-4 border-t border-gray-200">
        <button
          onClick={onDownloadInvoice}
          className="w-full flex items-center justify-center gap-2 text-[#266DDF] font-semibold transition text-xs sm:text-sm md:text-base hover:opacity-80"
        >
          <Download size={16} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]"/>
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default MyAMCCard;

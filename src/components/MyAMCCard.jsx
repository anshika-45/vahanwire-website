import React from "react";
import { Download } from "lucide-react";
const MyAMCCard = ({
  plan,
  vehicle,
  validity,
  bgColor,
  logoSrc,
  carImageSrc,
  onDownloadInvoice,
}) => {
  return (
    <div className="flex flex-col items-center w-full md:w-[280px] lg:w-[300px] 2xl:w-[340px] mx-auto">
      <div
        className={`${bgColor} rounded-lg md:rounded-xl p-2 md:p-3 lg:p-4 w-full relative overflow-visible min-h-[130px] md:min-h-[160px] lg:min-h-[180px]`}
      >
        <div className="absolute left-0 top-1.5 md:top-2 lg:top-3 bg-white rounded-r-full w-8 md:w-10 lg:w-12 h-6 md:h-8 lg:h-10 flex items-center justify-end pr-1 md:pr-1.5 shadow-md z-10">
          <img
            src={logoSrc || "/src/assets/Logo-AMC.svg"}
            alt="VahanWire Logo"
            loading="lazy"
            className="w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6 object-contain"
          />
        </div>

        <div className="relative flex justify-end items-start pr-1.5 md:pr-2 mt-0 md:mt-1">
          <img
            src="/src/assets/back-logo.webp"
            alt="Background decorative logo"
            loading="lazy"
            className="absolute right-1.5 md:right-3 lg:right-4 -top-12 md:-top-10 lg:-top-8 w-16 md:w-20 lg:w-24 opacity-60 pointer-events-none"
          />
          <img
            src={carImageSrc || "/src/assets/Car-AMC.svg"}
            alt="Vehicle image"
            loading="lazy"
            className="relative z-10 w-10 md:w-12 lg:w-16 object-contain"
          />
        </div>
        <h3 className="text-white text-xs md:text-base lg:text-xl font-bold mt-2 md:mt-3 line-clamp-1">
          {plan}
        </h3>
        <div className="flex justify-between text-white mt-1.5 md:mt-2 gap-1.5">
          <div className="min-w-0">
            {vehicle && (
              <div className="text-xs opacity-80">Vehicle Number</div>
            )}
            <div className="text-xs md:text-sm font-semibold tracking-wide truncate">
              {vehicle}
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            {validity && <div className="text-xs opacity-80">Valid For</div>}
            <div className="text-xs md:text-sm font-semibold">{validity}</div>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-100 rounded-lg md:rounded-b-xl py-1.5 md:py-2 px-2 md:px-3">
        <button
          onClick={onDownloadInvoice}
          className="w-full flex items-center justify-center gap-1.5 text-[#266DDF] font-semibold transition text-xs md:text-sm hover:opacity-80 active:opacity-60"
        >
          <Download
            size={16}
            className="w-4 sm:w-4 md:w-[18px] lg:w-[18px] h-4 sm:h-4 md:h-[18px] lg:h-[18px]"
          />
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default MyAMCCard;

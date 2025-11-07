import React from "react";
import { Download } from "lucide-react";

const MyAMCCard = ({ plan, vehicle, validity, bgColor, logoSrc, carImageSrc }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[420px] mx-auto">
      <div
        className={`${bgColor} rounded-t-xl p-4 md:p-6 w-full relative overflow-visible min-h-[170px] sm:min-h-[200px] md:min-h-[230px]`}
      >
        <div className="absolute left-0 top-3 md:top-4 bg-white rounded-r-full w-12 md:w-16 h-10 md:h-14 flex items-center justify-end pr-2 shadow-md z-10">
          <img
            src={logoSrc || "/src/assets/Logo1.webp"}
            alt="Logo"
            loading="lazy"
            className="w-6 md:w-8 h-6 md:h-8 object-contain"
          />
        </div>

        <div className="relative flex justify-end pr-2">
          <img
            src="/src/assets/back-logo.webp"
            alt="Background Logo"
            loading="lazy"
            className="absolute right-4 -top-10 w-24 sm:w-28 md:w-32 opacity-60 pointer-events-none"
          />

          <img
            src={carImageSrc || "/src/assets/carAMC.webp"}
            alt="Car"
            loading="lazy"
            className="relative z-10 w-16 sm:w-20 md:w-24 object-contain"
          />
        </div>
        <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mt-4 line-clamp-1">
          {plan}
        </h3>

        <div className="flex justify-between text-white mt-3">
          <div>
            {vehicle && <div className="text-xs opacity-80">Vehicle Number</div>}
            <div className="text-sm sm:text-base font-semibold">{vehicle}</div>
          </div>
          <div className="text-right">
            {validity && <div className="text-xs opacity-80">Valid For</div>}
            <div className="text-sm sm:text-base font-semibold">{validity}</div>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-100 rounded-b-xl py-3 px-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center gap-2 text-[#266DDF] font-semibold transition text-sm md:text-base hover:opacity-80">
          <Download size={16} />
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default MyAMCCard;

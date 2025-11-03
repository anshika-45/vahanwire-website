import React from "react";
import { Download } from "lucide-react";
const MyAMCCard = ({ plan, vehicle, validity, bgColor, logoSrc, carImageSrc }) => {
  return (
    <div className="flex flex-col items-center w-[240px] sm:w-[280px] md:w-[320px]">
      <div className={`${bgColor} rounded-t-xl p-3 sm:p-4 md:p-6 w-full h-[160px] sm:h-[190px] md:h-[220px] relative overflow-visible`}>
        <div className="absolute left-0 top-3 sm:top-4 md:top-6 bg-white rounded-r-full w-12 sm:w-14 md:w-16 h-10 sm:h-12 md:h-14 flex items-center justify-end pr-2 sm:pr-3 shadow-md z-10">
          <img src={logoSrc || "/src/assets/Logo1.webp"} loading="lazy" alt="Logo" className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 object-contain" />
        </div>
        <div className="relative flex justify-end items-start mb-3 sm:mb-4 md:mb-6 z-10">
          <img src="/src/assets/back-logo.webp" loading="lazy" alt="Background Logo" className="absolute right-4 sm:right-6 -top-10 sm:-top-12 md:-top-14 w-24 sm:w-28 md:w-34 h-24 sm:h-28 md:h-32 object-contain opacity-70" />
          <div className="text-white">
            <img src={carImageSrc || "/src/assets/carAMC.webp"} loading="lazy" alt="Car" className="w-14 sm:w-17 md:w-20 h-12 sm:h-14 md:h-16 object-contain relative z-10" />
          </div>
        </div>
        <h3 className="text-white text-sm sm:text-base md:text-xl font-bold mb-3 sm:mb-4 md:mb-6 relative z-10 line-clamp-1">{plan}</h3>
        <div className="flex gap-3 sm:gap-4 md:gap-6 text-white relative z-10">
          <div>
            <div className="text-xs opacity-90">{vehicle ? 'Vehicle Number' : ''}</div>
            <div className="text-xs sm:text-sm md:text-base font-bold tracking-wide">{vehicle}</div>
          </div>
          <div>
            <div className="text-xs opacity-90">{validity ? 'Valid For' : ''}</div>
            <div className="text-xs sm:text-sm md:text-base font-bold">{validity}</div>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-100 rounded-b-xl py-2 sm:py-3 md:py-3 px-3 sm:px-4 md:px-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center gap-2 text-[#266DDF] font-semibold transition text-xs sm:text-sm md:text-base">
          <Download size={16} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
          Download Invoice
        </button>
      </div>
    </div>
  );
};
export default MyAMCCard;
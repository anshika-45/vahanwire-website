import React from "react";
import { useNavigate } from "react-router-dom";
import { useAmcData } from "../context/AmcDataContext";
import carIcon from "../assets/car.webp";
import carIconDark from "../assets/car-1.webp";
import bikeIcon from "../assets/motorbike.webp";
import bikeIconDark from "../assets/motorbike-1.webp";

const AmcTabs = ({ showRemoveFilter }) => {
  const { amcType, setAmcType, getAmcTabs, vehicleType } = useAmcData();
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-0 sm:gap-0 w-fit sm:w-fit mx-auto mt-4 sm:mt-8 mb-4 sm:mb-8 bg-[#F2F2F2] border-[#d8d8d8] rounded-full">
      <div className="flex items-center gap-0 flex-wrap sm:flex-nowrap justify-center">
        {getAmcTabs
          .filter((tab) => !showRemoveFilter || amcType === tab.value)
          .map((tab) => {
            const isSelected = amcType === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => !showRemoveFilter && setAmcType(tab.value)}
                disabled={showRemoveFilter}
                className={`relative flex items-center gap-0 px-2 sm:px-3 md:px-6 py-2 rounded-[80px] text-sm sm:text-base md:text-[16px] font-medium transition-all duration-300 h-10 sm:h-12 md:h-[50px] whitespace-nowrap
                  ${
                    isSelected
                      ? "text-white bg-[#3B77D5]"
                      : showRemoveFilter
                      ? "text-[#344054] cursor-not-allowed"
                      : "text-[#344054]"
                  }
                `}
              >
                <img
                  src={
                    vehicleType === "bike"
                      ? isSelected
                        ? bikeIcon
                        : bikeIconDark
                      : isSelected
                      ? carIcon
                      : carIconDark
                  }
                  alt={vehicleType === "bike" ? "Bike Icon" : "Car Icon"}
                  className="w-4 sm:w-5 h-4 sm:h-5 object-contain flex-shrink-0 mr-2"
                  loading="lazy"
                />
                {tab.label}
              </button>
            );
          })}
      </div>
      {showRemoveFilter && (
        <button
          onClick={() => navigate("/vehicle-amc")}
          className="flex items-center gap-0 px-3 sm:px-3 md:px-6 py-2 rounded-[80px] text-[#172E53] bg-[#F2F2F2] font-medium transition-all duration-300 h-10 sm:h-12 md:h-[50px] text-sm sm:text-base md:text-[16px] whitespace-nowrap"
        >
          X Remove Filter
        </button>
      )}
    </div>
  );
};

export default AmcTabs;

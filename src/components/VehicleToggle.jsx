import React from "react";
import carGrey from "../assets/CarFade.webp";
import carColor from "../assets/CarFill.webp";
import bikeGrey from "../assets/BikeFade.webp";
import bikeColor from "../assets/BikeFill.webp";
import vector from "../assets/radio-button-unchecked.webp";
import image from "../assets/radio-button-checked.webp"; 

const VehicleToggle = ({ vehicleType, setVehicleType, disabled = false }) => {
  const options = [
    {
      id: "car",
      label: "Car",
      imgGrey: carGrey,
      imgColor: carColor,
    },
    {
      id: "bike",
      label: "Bike",
      imgGrey: bikeGrey,
      imgColor: bikeColor,
    },
  ];
  return (
    <div className="flex justify-center gap-2 md:gap-6 mt-4 md:mt-6 flex-wrap">
      {options.map((option) => {
        const isSelected = vehicleType === option.id;
        return (
          <label
            key={option.id}
            className={`flex items-center justify-between border-[1.5px] rounded-[10px] px-2 md:px-4 py-1.5 md:py-[10px] ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} w-[140px] md:w-[180px] transition-all
            ${isSelected
              ? "border-[#007bff] bg-[#FFFFFF] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.10)]"
              : `border-[#E0E0E0] bg-[#FAFAFA] ${disabled ? '' : 'hover:border-[#007bff]/60'}`
            }`}
          >
            <input
              type="radio"
              name="vehicle"
              checked={isSelected}
              onChange={() => !disabled && setVehicleType(option.id)}
              disabled={disabled}
              className="hidden"
            />
            <div className="flex items-center gap-1 md:gap-2">
              <span className="w-5 md:w-[24px] h-5 md:h-[24px] relative flex-shrink-0">
                <img src={vector} alt="Radio outer" loading="lazy" className="absolute top-0 left-0 w-full h-full" />
                {isSelected && (
                  <img src={image} alt="Radio inner" loading="lazy" className="absolute top-0 left-0 w-full h-full" />
                )}
              </span>
              <span
                className={`text-xs md:text-[16px] font-medium leading-6 md:leading-[24px] transition-colors truncate
                  ${isSelected ? "text-[#1A1A1A]" : "text-[#666666]"}
                `}
              >
                {option.label}
              </span>
            </div>
            <img
              src={isSelected ? option.imgColor : option.imgGrey}
              alt={option.label}
              loading="lazy"
              className="w-8 md:w-[50px] h-6 md:h-[34px] object-contain flex-shrink-0"
            />
          </label>
        );
      })}
    </div>
  );
};

export default VehicleToggle;
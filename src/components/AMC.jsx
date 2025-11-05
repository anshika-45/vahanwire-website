import React from "react";
import VehicleToggle from "./VehicleToggle.jsx";

const AMC = ({ vehicleType = "car", setVehicleType, isFilter = false }) => {
  return (
    <section className="bg-[#172E53] text-white w-full py-6 sm:py-8 md:py-10 lg:py-12 text-center">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
        <h2 className="text-4xl font-semibold">Annual Maintenance Contracts</h2>
        <p className="mt-2 sm:mt-3 md:mt-4 text-gray-200 text-sm sm:text-base">
          Compare and choose the perfect AMC plan for your vehicle
        </p>
        <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-9">
          <VehicleToggle
            vehicleType={vehicleType}
            setVehicleType={setVehicleType}
            disabled={isFilter}
          />
        </div>
      </div>
    </section>
  );
};

export default AMC;
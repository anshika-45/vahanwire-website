import React from "react";
import Button from "./Button";
const ProfileSection = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 z-50">
      <div className="flex flex-col items-center md:items-start">
        <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl font-bold shadow-lg">
          AB
        </div>

        <div className="flex items-center gap-2 mb-3 md:mb-4 mt-3 md:mt-4">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">4.8</span>
          <div className="flex text-yellow-400 text-lg sm:text-xl md:text-2xl">★</div>
        </div>
        <Button
          text="Edit"
          className="bg-blue-600 text-white px-4 md:px-6 py-1 md:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
        />
      </div>
      <div className="flex-1 space-y-3 md:space-y-6 w-full">
        {[
          { label: "Name*", type: "text",placeholder: "Enter Name" },
          { label: "Phone Number*", type: "tel", placeholder: "Phone Number" },
          { label: "Email Address*", type: "email", placeholder: "Enter Email" },
        ].map((field, index) => (
          <div key={index}>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
              {field.label}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              defaultValue={field.value}
              className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#D9E7FE]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProfileSection;
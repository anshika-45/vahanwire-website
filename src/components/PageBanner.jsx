import React from "react";

/**
 * Reusable Page Banner Component
 * @param {string} title - The heading to display on the banner
 * @param {string} image - The background image for the banner
 */

const PageBanner = ({ title, image }) => {
  return (
    <div className="relative w-full  h-[260px] overflow-hidden bg-red-100">
     
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-[260px]"
      />

    
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default PageBanner;
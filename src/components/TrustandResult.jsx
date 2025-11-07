import React from "react";
import bgImage from "../assets/result.webp";
import Card from "./Card";
const TrustandResult = () => {
  return (
    <div className="relative w-full h-auto  pt-8 pb-14">
      <div className="absolute inset-0 bg-[#183f7f]"></div>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className="relative z-10 justify-items-center py-4 md:py-[50px]">
      <div className="container   ">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-white text-center">
          Powered by Trust & Results
        </h1>
      <p className="text-xs sm:text-xs md:text-sm text-[#F0F6FF] text-center pt-2 md:pt-4 leading-relaxed">
        See why customers across India rely on VahanWire for fast, reliable,
        and <br className="hidden md:block" />
          transparent vehicle services — anytime, anywhere.
          </p>
        </div>
      </div>
     
        <div className="container relative z-10">
          <Card />
        
      </div>
    </div>
  );
};
export default TrustandResult;
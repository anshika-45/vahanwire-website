import React from "react";
import bgImage from "../assets/result.webp";
import Card from "./Card";
const TrustandResult = () => {
  return (
    <div className="relative w-full h-auto md:h-[650px] py-8 md:py-0">
      <div className="absolute inset-0 bg-[#183f7f]"></div>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className="relative z-10 justify-items-center py-6 md:py-[75px]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
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
      <div className="relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <Card />
        </div>
      </div>
    </div>
  );
};
export default TrustandResult;
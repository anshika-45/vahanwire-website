import React from "react";
import { S3_IMAGES } from "../constants/images";
import Card from "./Card";
const TrustandResult = () => {
  return (
    <div className="relative w-full h-auto mt-4 sm:mt-6 md:mt-4  md:pt-10 pt-5 md:pb-14 pb-7">
      <div className="absolute inset-0 bg-[#183f7f]"></div>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url(${S3_IMAGES.TRUST_BG})` }}
      ></div>
      <div className="relative z-10 justify-items-center pt-1">
        <div className="container   ">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-center text-white mb-1">
            Vahanwire Partners

          </h1>
          <div className="flex justify-center items-center">
            <p className="text-[14px] sm:text-lg text-white text-center pt-1 md:pt-4 lg:w-[50%] md:w-[60%] w-[90%]">
            See why customers across India rely on Vahanwire for fast, reliable,
            and
            transparent vehicle services — anytime, anywhere.
          </p>
          </div>
        </div>
      </div>
      <div className="container relative z-10">
        <Card />
      </div>
    </div>
  );
};
export default TrustandResult;

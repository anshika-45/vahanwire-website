import React from "react";
import Slider from "./Slider";
const LatestOffer = () => {
  return (
    <div className="justify-items-center  md:pt-5 pb-4 mt-0 sm:mt-6 md:mt-0 h-auto bg-[#FFFFFF]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-center text-[#242424]">
          Latest Offers for You
        </h1>
       <div className="flex justify-center items-center">
         <p className="text-[14px] sm:text-lg text-[#5C5C5C] text-center pt-2 md:pt-4 md:w-[60%] w-[90%]">
          Get exclusive deals on vehicle services, fuel delivery, and more —
          
          updated in real time from our partner network.
        </p>
       </div>
      </div>
     <div className="mt-2 sm:mt-8 md:mt-8"> <Slider /></div>
    </div>
  );
};
export default LatestOffer;

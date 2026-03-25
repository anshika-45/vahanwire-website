import React from "react";
import { S3_IMAGES } from "../constants/images";
import Button from "./Button";
const AmcBanner = () => {

  return (
    <section className="w-full py-6 sm:py-8 md:py-10 bg-white flex justify-center  sm:mb-8">
      <div className="container">
        <div className="relative rounded-3xl overflow-hidden shadow-lg">
          <img
            src={S3_IMAGES.DRIVE_BANNER}
            alt="You Drive, We Care, Anytime, Anywhere. Connect With Mechanics, Compare Offers And Get Service At Your Price."
            loading="eager"
            className="w-full h-[200px] sm:h-[280px] md:h-[380px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#AD0100]/40 via-[#000000]/10 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col  justify-center px-3 sm:px-8 md:px-10 lg:px-16 text-white">
            <h2

              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 leading-tight md:block hidden text-justify "
            >
              You Drive, We Care<br></br> Anytime, Anywhere
            </h2>
            <h2

              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 leading-tight  md:hidden block "
            >
              You Drive, We Care, Anytime, Anywhere.
            </h2>
            <p className="text-xs sm:text-sm md:text-[15px] text-justify max-w-xs sm:max-w-lg mb-3 sm:mb-4 md:block hidden">
            Connect With Mechanics, Compare Offers 
              <br></br> — And Get Service At Your Price.
            </p>
            <p className="text-xs sm:text-sm md:text-[15px] text-justify max-w-xs sm:max-w-lg mb-3 sm:mb-4 md:hidden block">
              {/* Get Annual Maintenance, Priority Support, And On-Road Assistance — All Under One Affordable Plan Designed For Your
              Vehicle. */}
              Connect With Mechanics, Compare Offers, And Get Service At Your Price.
            </p>
            {/* <div className="w-fit">
              <Button
                text="Buy Now"
                className="text-black font-bold bg-[#FBBA01] p-2 sm:p-3 px-4 sm:px-6 text-xs sm:text-sm"
                onClick={onBuy}
              />
            </div> */}
          </div>
          <img
            loading="lazy"
            src={S3_IMAGES.BLUR_LOGO}
            alt=""
            className="absolute right-0 transform top-1/2 translate-y-15 w-20 sm:w-28 md:w-36 h-auto opacity-90 flex-shrink-0"
          />
        </div>
      </div>
    </section>
  );
};
export default AmcBanner;

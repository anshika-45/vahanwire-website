import React from "react";
import { S3_IMAGES } from "../constants/images";
import accountBanner from "../assets/accountBanner.png"
import accountBannerTwo from "../assets/accountBanner2.png"
const divClasses = 'h-[160px] sm:h-[200px] md:h-[240px] lg:h-[300px] xl:h-[360px] 2xl:h-[420px]'
const AccountBanner = () => {
  return (
    <div
      className="
        relative w-full
        md:py-35 py-0 md:h-auto h-[150px]
        overflow-hidden
        shadow-md
      "
    >
      <img
        loading="eager"
        // src={S3_IMAGES.ACCOUNT_BANNER}
        src={accountBanner}
        alt="Account Banner"
        fetchPriority="high"
        decoding="async"
        // className="w-full h-full lg:object-cover object-center opacity-95"
        className="w-full md:h-full h-[150px] absolute object-cover top-0 bottom-0 opacity-95"
      />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center px-3 sm:px-4">
        <h1
          className="
            text-white font-bold text-center leading-tight md:leading-snug
            text-[clamp(18px,4vw,40px)]  md:top-1/2 md:left-1/3 md:-translate-y-0 absolute top-1/2 -translate-y-1/2 left-[25%] 
          "
        >
          My Account
        </h1>
      </div>
    </div>
  );
};

export default AccountBanner;

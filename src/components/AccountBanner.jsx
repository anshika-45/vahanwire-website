import React from "react";
import { S3_IMAGES } from "../constants/images";
const divClasses = 'h-[160px] sm:h-[200px] md:h-[240px] lg:h-[300px] xl:h-[360px] 2xl:h-[420px]'
const AccountBanner = () => {
  return (
    <div
      className="
        relative w-full
        md:py-35 py-0 md:h-auto h-[120px]
        overflow-hidden
        shadow-md
      "
    >
      <img
        loading="eager"
        src={S3_IMAGES.ACCOUNT_BANNER}
        alt="Account Banner"
        fetchPriority="high"
        decoding="async"
        // className="w-full h-full lg:object-cover object-center opacity-95"
        className="w-full md:h-full h-[120px] absolute object-cover left-0 right-0 top-0 bottom-0 opacity-95"
      />
      <div className="absolute inset-0 bg-black/25 flex items-center justify-center px-3 sm:px-4">
        <h1
          className="
            text-white font-bold text-center leading-tight md:leading-snug
            text-[clamp(18px,4vw,40px)]
          "
        >
          My Account
        </h1>
      </div>
    </div>
  );
};

export default AccountBanner;

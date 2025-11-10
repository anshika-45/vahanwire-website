import React from "react";
import accountBannerImg from "../assets/account-banner.webp";

const AccountBanner = () => {
  return (
    <div
      className="
        relative w-full
        h-[160px] sm:h-[200px] md:h-[200px] lg:h-[300px] xl:h-[360px] 2xl:h-[420px]
        overflow-hidden
        mt-[56px] sm:mt-[64px] md:mt-[72px]
        shadow-md
      "
    >
      <img
        loading="eager"
        src={accountBannerImg}
        alt="Account Banner"
        fetchPriority="high"
        decoding="async"
        className="w-full h-full object-cover object-center opacity-95"
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

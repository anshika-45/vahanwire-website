import React from "react";
import accountBannerImg from "../assets/account-banner.webp";
const AccountBanner = () => {
  return (
    <div className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] overflow-hidden mt-[65px] shadow-md">
      <img loading="eager"
        src={accountBannerImg}
        alt="Account Banner"
        fetchPriority="high"
        decoding="async"
        className="w-full h-full object-cover object-center opacity-95"
      />
      <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
        <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center px-4 leading-tight">
          My Account
        </h1>
      </div>
    </div>
  );
};
export default AccountBanner;

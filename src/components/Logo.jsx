import React from "react";
import logoImg from '../assets/logo.webp'
const Logo = React.memo(() => {
  return (
    <div className="flex">
      <img
      src={logoImg}
      loading="eager"
      alt="VahanWire Logo"
      className="w-[150px] sm:w-[170px] md:w-[190px] lg:w-[270px] h-8 sm:h-9 md:h-[35px] lg:h-10 flex gap-5"
      width="270"
      height="40"
      decoding="async"
        fetchPriority="high"
      />
    </div>
  );
});
Logo.displayName = 'Logo';
export default Logo;

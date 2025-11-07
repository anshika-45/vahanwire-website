import React from "react";
import logoImg from "../assets/logo.webp";
const Logo = React.memo(() => {
  return (
    <div className="flex">
      <img
        src={logoImg}
        loading="eager"
        alt="VahanWire Logo"
        className="w-[210px] object-contain"
        width="270"
        height="40"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
});
Logo.displayName = "Logo";
export default Logo;

import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.webp";
const Logo = React.memo(() => {
  return (
    <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex">
      <img
        src={logoImg}
        loading="eager"
        alt="VahanWire Logo"
        className="w-[270px] object-contain"
        width="270"
        height="40"
        decoding="async"
        fetchPriority="high"
      />
    </Link>
  );
});
Logo.displayName = "Logo";
export default Logo;

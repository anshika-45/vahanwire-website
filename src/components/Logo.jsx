import React from "react";
import { Link } from "react-router-dom";
import { S3_IMAGES } from "../constants/images";
const Logo = React.memo(() => {
  return (
    <Link
      to="/"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex"
    >
      <img
        src={S3_IMAGES.HOME_LOGO}
        loading="eager"
        alt="Vahanwire Logo"
        className="md:w-[270px] w-[250px] object-contain"
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


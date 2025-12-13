import React from "react";
import { Link } from "react-router-dom";
import { S3_IMAGES } from "../constants/images";
import santaHat from "../assets/santa sleigh/Christmas hat.json"
import Lottie from "lottie-react";
const Logo = React.memo(() => {
  return (
    <Link
      to="/"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex relative"
    >
       <div className="relative inline-block">
        <img
          src={S3_IMAGES.HOME_LOGO}
          loading="eager"
          alt="Vahanwire Logo"
          className="md:w-[270px] w-[220px] object-contain"
          width="270"
          height="40"
          decoding="async"
          fetchPriority="high"
        />
        <div
          className="
            absolute 
            -top-[55%] 
            -left-[12%]
            w-[37%]
            aspect-square
            pointer-events-none
            scale-x-[-1]
          "
        >
          <Lottie animationData={santaHat} autoplay loop />
        </div>
      </div>
    </Link>
  );
});
Logo.displayName = "Logo";
export default Logo;


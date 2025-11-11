import React from "react";
import bannerImg from "../assets/HomeBanner.webp";
import { Link, useNavigate } from "react-router-dom";
import AnimatedText from "./AnimatedText";
const bannerTexts = [
  "Car Service",
  "Bike Repairs",
  "Towing Help",
  "Emergency Fuel",
];
const Banner = React.memo(() => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full">
      <div>
        <div
          className="relative w-full h-[79vh] sm:h-[80vh] md:h-[100vh] bg-center bg-cover overflow-hidden"
          style={{
            backgroundImage: `url(${bannerImg})`,
          }}
        >
          <div className="container">
            {" "}
            <div className="absolute left-0 top-[40%] -translate-y-1/2  text-white  w-full">
              <div className="container">
                <h1 className="text-2xl md:text-5xl  leading-tight drop-shadow-lg py-1 md:my-5">
                  Your One-Stop <br /> Solution for
                </h1>
                <div className="max-w-[300px]">
                  <AnimatedText
                    texts={bannerTexts}
                    interval={500}
                    duration={1000}
                    outMs={360}
                    inMs={540}
                    animationClass="scale-90"
                    className="transform origin-center  transition-transform duration-400 overflow-visible"
                  />
                </div>

                <p className="md:my-3 py-4 text-xs md:text-[17px] max-w-xl drop-shadow-md">
                  Book trusted professionals near you for on-time, affordable,
                  <br />
                  and hassle-free vehicle & home services — anytime, anywhere.
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
Banner.displayName = "Banner";
export default Banner;

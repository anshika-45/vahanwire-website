import React from "react";
import bannerImg from "../assets/HomeBanner.webp";
import { Link } from "react-router-dom";
import AnimatedText from "./AnimatedText";
const bannerTexts = [
  "Car Service",
  "Bike Repairs",
  "Towing Help",
  "Emergency Fuel",
];
const Banner = React.memo(() => {
  return (
    <div className="relative w-full">
      <div className="pt-[calc(var(--header-height,4rem)+var(--announcement-height,2rem))]">
        <div
          className="relative w-full h-[79vh] sm:h-[80vh] md:h-[100vh] bg-center bg-cover overflow-hidden"
          style={{
            backgroundImage: `url(${bannerImg})`,
          }}
        >
          <div className="container">
            {" "}
            <div className="absolute left-0 top-1/2 -translate-y-1/2  text-white  w-full">
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
                <button className="md:my-3  text-[17px] bg-[#266DDF] text-white rounded-md transition">
                 <Link className="px-4 py-2 block" to={'/vehicle-amc'}>Book Now</Link>
                </button>
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

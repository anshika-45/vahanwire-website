import React from "react";
import bannerImg from "../assets/HomeBanner.webp";
import Button from "./Button";
import AnimatedText from "./AnimatedText";
const bannerTexts = [
  "Car Service",
  "Bike Repairs",
  "Towing Help",
  "Emergency Fuel",
];
const Banner = React.memo(() => {
  return (
    <div className="mt-8 sm:mt-16 md:mt-[100px] relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
      <picture>
        <source
          media="(max-width: 640px)"
          srcSet={`${bannerImg} 640w`}
          sizes="100vw"
        />
        <source
          media="(max-width: 1024px)"
          srcSet={`${bannerImg} 1024w`}
          sizes="100vw"
        />
        <source
          media="(max-width: 1920px)"
          srcSet={`${bannerImg} 1920w`}
          sizes="100vw"
        />
        <img
          loading="eager"
          src={bannerImg}
          width="1920"
          height="700"
          className="w-full h-full object-cover"
          alt="VahanWire - Your One-Stop Solution for Car Service, Bike Repairs, Towing Help, and Emergency Fuel"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div className="absolute top-30 sm:top-32 md:top-40 lg:top-[200px] left-0 w-full px-6 sm:px-8 md:px-16 lg:px-[100px] text-left text-white overflow-visible">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-1 sm:mb-2">
          Your One-Stop
          <br /> Solution for
        </h1>
        <div className="ml-0 sm:ml-[-15px] md:ml-[-20px] lg:ml-[-30px] h-28 flex items-center">
        <AnimatedText
        texts={bannerTexts}
        interval={1000}
        animationClass="scale-90"
        className="transform origin-center transition-transform duration-400 overflow-visible"
        />
        </div>
        <p className="text-xs sm:text-sm md:text-base mb-3 sm:mb-4 mt-0 sm:mt-1 md:mt-0 leading-snug sm:leading-normal">
          Book trusted professionals near you for on-time, affordable,
          <br />
          and hassle-free vehicle & home services — anytime, anywhere.
        </p>
        <Button
          text="Book Now"   
          className="px-3 sm:px-4 w-28 sm:w-34 text-sm sm:text-md font-semibold bg-[#266DDF]"
        />
      </div>
    </div>
  );
});
Banner.displayName = 'Banner';
export default Banner;

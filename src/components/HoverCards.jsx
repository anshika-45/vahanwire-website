import React from "react";
import bgImage from "../assets/GetHelp.webp"; 
const steps = [
  {
    number: "01",
    title: "Find Service Near You",
    text: "Choose the service you need — mechanic, towing, or fuel — based on your current location.",
  },
  {
    number: "02",
    title: "Pay & Confirm",
    text: "Make a secure payment and instantly confirm your request.",
  },
  {
    number: "03",
    title: "Provider Reaches You",
    text: "A verified service provider will arrive at your location and fix the issue on the spot.",
  },
];
const HoverCards = () => {
  return (
    <section className="w-full bg-white">
      <div className="relative px-0 sm:px-0">
        <img loading="lazy"
          src={bgImage}
          alt="service"
          className="w-full h-50 sm:h-80 md:h-[540px] object-cover"
        />
        <div className="md:absolute md:left-1/2 md:-bottom-20 lg:-bottom-24 xl:-bottom-30 md:transform md:-translate-x-1/2 w-full px-3 sm:px-4 md:px-0 mt-4 md:mt-0">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center gap-3 md:gap-7">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-lg w-full md:w-1/3 py-2 sm:py-2 md:py-12 lg:py-16 xl:py-18 px-3 sm:px-4 md:px-6 lg:px-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFBD00] via-[#32AB15] to-[#4184ED] opacity-0 group-hover:opacity-90 transition-opacity duration-500 rounded-3xl"></div>
                <div className="relative z-10">
                  <h2 className="text-4xl sm:text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-[#FFBD00] via-[#32AB15] to-[#4184ED] bg-clip-text text-transparent opacity-40 group-hover:bg-white group-hover:text-white group-hover:blur-0 mb-4 transition-all duration-500">
                    {step.number}
                  </h2>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#242424] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#242424] font-medium">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-20 md:h-30"></div>
    </section>
  );
};
export default HoverCards;
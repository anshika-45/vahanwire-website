import React from "react";
import bgImage from "../assets/GetHelp.svg";

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
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat py-4 lg:mb-32"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay for better text visibility */}

      {/* Content */}
      <div className="container relative z-10 flex flex-col items-center justify-center md:min-h-[80vh] px-4 py-16">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 lg:-mb-120">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg md:p-6 p-2 text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl overflow-hidden lg:min-h-76 min-h-40"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFBD00] via-[#32AB15] to-[#4184ED] opacity-0 group-hover:opacity-90 transition-opacity duration-500 rounded-3xl"></div>

              {/* Card content */}
              <div className="relative z-10">
                <h2 className="lg:text-8xl md:text-7xl text-2xl lg:pt-5 pt-3 font-extrabold bg-gradient-to-r from-[#FFBD00]/60 to-[#32AB15]/75 bg-clip-text text-transparent md:mb-4 mb-2 group-hover:text-white transition-all duration-500">
                  {step.number}
                </h2>
                <h3 className="text-lg md:text-xl font-semibold text-[#242424] md:mb-3 mb-1.5 group-hover:text-white transition-all duration-500">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-[#242424] font-medium group-hover:text-white transition-all duration-500">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HoverCards;

import React from "react";
import { S3_IMAGES } from "../constants/images";

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
      className="relative w-full lg:bg-cover bg-contain lg:bg-center bg-no-repeat pt-25 md:pb-10  lg:mb-32"
      style={{ backgroundImage: `url(${S3_IMAGES.GET_HELP})` }}
    >
      <div className="container relative z-10 flex flex-col items-center justify-center md:min-h-[400px] px-4 py-16">
        <div className="grid lg:grid-cols-3 grid-cols-1 md:gap-6 gap-6 px-1 lg:-mb-130">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl md:p-6 px-5 py-7 text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl overflow-hidden lg:min-h-76 min-h-40 max-w-[500px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFBD00] 10% via-[#32AB15] 80% to-[#4184ED] 10% opacity-0 group-hover:opacity-90 transition-opacity duration-500 rounded-3xl"></div>

              <div className="relative z-10 flex-col justify-between">
                <h2 className="text-8xl lg:pt-5  font-extrabold bg-gradient-to-r from-[#FFBD00]/60 to-[#32AB15]/75 bg-clip-text text-transparent md:mb-4 mb-2 group-hover:text-white/60 transition-all duration-500">
                  {step.number}
                </h2>
                <h3 className="text-xl md:text-xl font-semibold text-[#242424] md:mb-3 mb-1.5 group-hover:text-white transition-all duration-500">
                  {step.title}
                </h3>
                <p className="text-[15px] md:text-lg text-[#242424] md:font-medium group-hover:text-white transition-all duration-500">
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

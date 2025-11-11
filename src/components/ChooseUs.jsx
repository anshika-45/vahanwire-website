import React from "react";
import appImage from "../assets/ChooseUs.webp";
import Applogo from "../assets/Apple.webp";
import Playlogo from "../assets/playstore.webp";
import checkIcon from "../assets/check-circle.webp";
import Choose1 from "../assets/choose1.webp";
import Choose2 from "../assets/choose2.webp";
import Choose3 from "../assets/choose3.webp";

const ChooseUs = () => {
  return (
    <section className="bg-[#FAFCFF] overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="bg-white rounded-2xl border border-[#BCD2F5] py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 space-y-4 sm:space-y-8 text-left w-full">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl text-[#266DDF] mb-4 sm:mb-6 font-semibold">
                Smart & Reliable Vehicle Care
              </h2>
              <div className="border-t border-[#BCD2F5] my-3 sm:my-4"></div>
            </div>
            <ul className="space-y-3 sm:space-y-4">
              {[
                "All-in-one platform for vehicle services, fuel, towing, and payments",
                "Verified mechanics and trusted service centers",
                "Quick, reliable doorstep support available 24/7",
                "Transparent pricing with no hidden charges",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm font-normal"
                >
                  <img
                    loading="lazy"
                    src={checkIcon}
                    alt="feature included"
                    decoding="async"
                    className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5"
                  />
                  <span className="text-[#242424]">{item}</span>
                </li>
              ))}
            </ul>
            <hr className="border-[#BCD2F5] my-4 sm:my-6" />
            <div>
              <p className="font-semibold text-xs sm:text-sm mb-3 sm:mb-4">
                Download App Now
              </p>
              <div className="flex gap-2 sm:gap-3">
                <img
                  loading="lazy"
                  src={Applogo}
                  alt="Download on App Store"
                  decoding="async"
                  className="h-8 sm:h-10 md:h-11 object-contain cursor-pointer hover:opacity-80 transition"
                />
                <img
                  loading="lazy"
                  src={Playlogo}
                  alt="Get it on Google Play"
                  decoding="async"
                  className="h-8 sm:h-10 md:h-11 object-contain cursor-pointer hover:opacity-80 transition"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-2 sm:pt-4">
              <div className="flex -space-x-2">
                <img
                  loading="lazy"
                  src={Choose1}
                  alt="User testimonial 1"
                  decoding="async"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white"
                />
                <img
                  loading="lazy"
                  src={Choose2}
                  alt="User testimonial 2"
                  decoding="async"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white"
                />
                <img
                  loading="lazy"
                  src={Choose3}
                  alt="User testimonial 3"
                  decoding="async"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white"
                />
              </div>
              <p className="text-[#242424] text-xs sm:text-sm">
                <b>400k+</b> users around the globe
              </p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <img
              loading="lazy"
              src={appImage}
              alt="VahanWire App Interface"
              decoding="async"
              className="drop-shadow-2xl rounded-4xl w-full sm:w-4/5 lg:w-3/4 max-w-sm lg:max-w-md scale-180"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;

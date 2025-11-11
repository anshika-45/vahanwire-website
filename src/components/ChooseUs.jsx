import React from "react";
import Applogo from "../assets/Apple.webp";
import Playlogo from "../assets/playstore.webp";
import checkIcon from "../assets/check-circle.webp";
import Choose1 from "../assets/choose1.webp";
import Choose2 from "../assets/choose2.webp";
import Choose3 from "../assets/choose3.webp";

// NEW imports (replace the old appImage import)
import bgMobile from "../assets/bg-mobile.png";
import mobile from "../assets/mobile.png";

const ChooseUs = () => {
  return (
    <section className="bg-[#FAFCFF] overflow-hidden md:mt-10">
      <div className="mx-auto px-4 sm:px-6 md:px-6 md:max-w-lg lg:max-w-4xl">
        {/* Half–Half on lg+, stacked on small */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 md:gap-6 items-center justify-items-center">
          {/* LEFT: content (unchanged) */}
          <div className="bg-white rounded-2xl border border-[#BCD2F5] py-4 sm:py-6 md:py-8 px-4 sm:px-6 sm:space-y-5 text-left w-full">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl text-[#222222] mb-4 sm:mb-6 font-semibold">
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
                    alt=""
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
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download VahanWire on App Store"
                  className="inline-block hover:opacity-80 transition"
                >
                  <img
                    loading="lazy"
                    src={Applogo}
                    alt="Download on App Store"
                    role="img"
                    decoding="async"
                    className="h-8 sm:h-10 md:h-11 object-contain"
                  />
                </a>
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get VahanWire on Google Play"
                  className="inline-block hover:opacity-80 transition"
                >
                  <img
                    loading="lazy"
                    src={Playlogo}
                    alt="Get it on Google Play"
                    role="img"
                    decoding="async"
                    className="h-8 sm:h-10 md:h-11 object-contain"
                  />
                </a>
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

          {/* RIGHT: image composition (bg + phone) */}
          <div className="w-full flex justify-center lg:justify-end">
            <div className="relative w-full h-[260px] sm:h-[320px] md:h-[400px] lg:h-[440px] xl:h-[510px]">
              {/* Bigger Background */}
              <img
                src={bgMobile}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover lg:scale-150" 
              />

              {/* Mobile Phone Center */}
              <img
                src={mobile}
                alt="VahanWire mobile app preview"
                loading="lazy"
                decoding="async"
                className="absolute top-1/2 lg:left-[47%] md:left-[48%] left-1/2 -translate-x-1/3 -translate-y-1/2 w-[28%] sm:w-[20%] md:w-[28%] lg:w-[43%] h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;

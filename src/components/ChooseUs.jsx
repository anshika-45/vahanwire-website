import React from "react";
import Applogo from "../assets/Apple.svg";
import Playlogo from "../assets/Playstore.svg";
import checkIcon from "../assets/CheckIcon.svg";
import Choose1 from "../assets/Choose1.svg";
import Choose2 from "../assets/Choose2.svg";
import Choose3 from "../assets/Choose3.svg";
import mobile from "../assets/Mobile.svg"; 

const ChooseUs = () => {
  return (
    <section className="bg-[#FAFCFF] overflow-hidden md:mt-8">
      <div className="mx-auto px-4 sm:px-6 md:px-4 md:max-w-lg lg:max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 md:gap-6 items-center justify-items-center">
          <div className="bg-white rounded-2xl border border-[#BCD2F5] py-4 sm:py-6 md:py-8 px-4 sm:px-6 sm:space-y-5 text-left w-full">
            <div>
              <h2 className="text-lg sm:text-xl md:text-[20px] text-[#222222] mb-4 sm:mb-6 font-semibold text-center">
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
                  className="flex items-start gap-2 sm:gap-3 text-xs sm:text-[15px] font-normal"
                >
                  <img
                    loading="lazy"
                    src={checkIcon}
                    alt=""
                    decoding="async"
                    width="24"
                    height="24"
                    className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5"
                  />
                  <span className="text-[#242424]">{item}</span>
                </li>
              ))}
            </ul>

            <hr className="border-[#BCD2F5] my-4 sm:my-6" />

            <div>
              <p className="font-semibold text-xs sm:text-lg mb-3 sm:mb-4">
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
                    width="108"
                    height="40"
                    className="h-8 sm:h-10 md:h-11 w-auto object-contain cursor-pointer"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.vahanwireprovider"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get VahanWire on Google Play"
                  className="inline-block hover:opacity-80 transition cursor-pointer"
                >
                  <img
                    loading="lazy"
                    src={Playlogo}
                    alt="Get it on Google Play"
                    role="img"
                    decoding="async"
                    width="108"
                    height="40"
                    className="h-8 sm:h-10 md:h-11 w-auto object-contain cursor-pointer"
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
                  width="40"
                  height="40"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                />
                <img
                  loading="lazy"
                  src={Choose2}
                  alt="User testimonial 2"
                  decoding="async"
                  width="40"
                  height="40"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                />
                <img
                  loading="lazy"
                  src={Choose3}
                  alt="User testimonial 3"
                  decoding="async"
                  width="40"
                  height="40"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                />
              </div>
              <p className="text-[#242424] text-xs sm:text-[16px]">
                <b>400k+</b> users around the globe
              </p>
            </div>
          </div>

          <div className="w-full flex justify-center lg:justify-end">
            <div className="aspect-[2/3]">
                         <img
             src={mobile}
             alt="VahanWire mobile app preview"
             loading="lazy"
             decoding="async"
             width="250"
             height="500"
             className="w-full h-[450px] drop-shadow-xl"
           />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;

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
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
        <div className="flex justify-center mr-8 order-1 md:order-2 h-auto relative ">
          <img
          
            loading="lazy"
            src={appImage}
            alt="VahanWire App"
            className=" drop-shadow-2xl md:scale-180  h-full rounded-[2rem]"
          />
        </div>
        <div className="bg-white rounded-2xl border border-[#BCD2F5] md:py-2 py-4 sm:p-4 space-y-8 md:h-[610px] h-auto lg:w-[500px] w-full  text-left order-2 md:order-1 px-5">
          <div>
            <h2 className="text-xl md:text-2xl text-skyblue-200 mb-7 py-2 text-center font-semibold">
              Smart & Reliable Vehicle Care
            </h2>
            <div className="border-t border-[#BCD2F5] my-4 shadow-md"></div>
          </div>
          <ul className="space-y-3 ">
            {[
              "All-in-one platform for vehicle services, fuel, towing, and payments",
              "Verified mechanics and trusted service centers",
              "Quick, reliable doorstep support available 24/7",
              "Transparent pricing with no hidden charges",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm font-normal"
              >
                <img
                  loading="lazy"
                  src={checkIcon}
                  alt="check"
                  className="w-6 h-6 flex-shrink-0 mt-1"
                />
                <span className="text-[#242424]">{item}</span>
              </li>
            ))}
          </ul>
          <hr className="border-[#BCD2F5] my-4" />
          <div>
            <p className="font-semibold text-sm mb-4 text-left">
              Download App Now
            </p>
            <div className="flex md:flex-row flex-col gap-2 justify-start">
              <img
                loading="lazy"
                src={Applogo}
                alt="App Store"
                className="h-10 sm:h-8 md:h-12 lg:h-14 object-contain cursor-pointer"
              />
              <img
                loading="lazy"
                src={Playlogo}
                alt="Google Play"
                className="h-10 sm:h-8 md:h-12 lg:h-14 object-contain cursor-pointer"
              />
            </div>
          </div>
          <div className="flex md:flex-row flex-col items-center gap-3 pt-1">
            <div className="flex -space-x-2">
              <img
                loading="lazy"
                src={Choose1}
                alt="Image"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                loading="lazy"
                src={Choose2}
                alt="Image"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                loading="lazy"
                src={Choose3}
                alt="Image"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </div>
            <p className="text-[#242424] text-sm">
              <b>400k+</b> users around the globe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ChooseUs;

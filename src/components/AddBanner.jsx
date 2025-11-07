import React from "react";
import AddImage from "../assets/addbanner.webp";
import AppStore from "../assets/Apple.webp";
import GooglePlay from "../assets/playstore.webp";
const AddBanner = () => {
  return (
    <>
      <section className="w-full pt-40 mt-50 flex justify-center relative max-md:pt-60 max-md:mt-80 max-sm:pt-0 max-sm:mt-0 max-sm:pb-8">
        <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-b from-white to-[#00AB11] opacity-50 hidden sm:block"></div>
        <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-b from-white to-[#157EFD] opacity-50 hidden sm:block"></div>
        <div
          className="w-[95%] sm:w-[90%] lg:w-[85%] max-w-7xl rounded-3xl overflow-hidden shadow-lg absolute -bottom-40 z-10 bg-cover bg-center mt-20 sm:mt-28 md:mt-40
          max-sm:static max-sm:mt-10  max-sm:p-4"
          style={{
            backgroundImage: `url(${AddImage})`,
          }}
        >
          <img
            src={AddImage}
            alt="Add Banner Background"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="hidden"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 p-4 sm:p-6 md:py-15 md:px-15">
            <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-[#242424] leading-snug">
                  Your Vehicle's Best Friend — <br /> In One App
                </h2>
                <p className="text-[#5C5C5C] mt-3 sm:mt-4 text-base md:text-lg">
                  Find nearby mechanics, book services, get on-road <br />
                  assistance, and manage your vehicle
                </p>
              </div>
              <div className="mt-5 sm:mt-8">
                <p className="font-bold text-[#242424] mb-3 text-xs md:text-base">
                  Download User App
                </p>
                <div className="flex gap-3 flex-wrap">
                  <img
                    loading="lazy"
                    src={AppStore}
                    alt="App Store"
                    className="h-10 sm:h-14 md:h-16 shrink-0"
                  />
                  <img
                    loading="lazy"
                    src={GooglePlay}
                    alt="Google Play"
                    className="h-10 sm:h-14 md:h-16 shrink-0"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-8 flex flex-col justify-between ">
              <div>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-[#242424] leading-snug max-sm:text-base">
                  Grow Your Garage. Reach More Customers.
                </h2>
                <p className="text-[#5C5C5C] mt-3 sm:mt-4 text-sm sm:text-base md:text-lg">
                  Join VahanWire and start receiving service <br />
                  requests instantly.
                </p>
              </div>
              <div className="mt-5 sm:mt-8">
                <p className="font-bold text-[#242424] mb-3 text-xs sm:text-sm md:text-base">
                  Download Provider App
                </p>
                <div className="flex gap-3 flex-wrap">
                  <img
                    src={AppStore}
                    alt="App Store"
                    loading="lazy"
                    className="h-10 sm:h-14 md:h-16 shrink-0"
                  />
                  <img
                    src={GooglePlay}
                    alt="Google Play"
                    loading="lazy"
                    className="h-10 sm:h-14 md:h-16 shrink-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default AddBanner;
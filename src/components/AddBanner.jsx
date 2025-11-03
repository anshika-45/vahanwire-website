import React from "react";
import AddImage from "../assets/addbanner.webp";
import AppStore from "../assets/Apple.webp";
import GooglePlay from "../assets/playstore.webp";
const AddBanner = () => {
  return (
    <>
      <section className="w-full pt-40 mt-50 flex justify-center relative max-sm:pt-20 max-sm:mt-10">
        <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-b from-white to-[#00AB11] opacity-50 hidden sm:block"></div>
        <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-b from-white to-[#157EFD] opacity-50 hidden sm:block"></div>
        <div
          className="w-[95%] sm:w-[40%] md:w-[90%] max-w-7xl rounded-3xl overflow-hidden shadow-lg absolute -bottom-40 z-10 bg-cover bg-center p-6 sm:p-8 mt-38 md:p-12
          max-sm:static max-sm:mt-0 max-sm:w-[90%] max-sm:p-4"
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
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-5 max-sm:p-3">
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col justify-between max-sm:p-4">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#242424] leading-snug max-sm:text-base">
                  Your Vehicle's Best Friend — <br /> In One App
                </h2>
                <p className="text-[#5C5C5C] mt-3 sm:mt-4 text-base sm:text-lg max-sm:text-sm">
                  Find nearby mechanics, book services, get on-road <br />
                  assistance, and manage your vehicle
                </p>
              </div>
              <div className="mt-6 sm:mt-8 max-sm:mt-4">
                <p className="font-bold text-[#242424] mb-3 text-sm sm:text-base max-sm:text-xs">
                  Download User App
                </p>
                <div className="flex gap-2 flex-wrap">
                  <img loading="lazy"
                    src={AppStore}
                    alt="App Store"
                    className="h-14 sm:h-16 flex-shrink-0 max-sm:h-10"
                  />
                  <img loading="lazy"
                    src={GooglePlay}
                    alt="Google Play"
                    className="h-14 sm:h-16 flex-shrink-0 max-sm:h-10"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 flex flex-col justify-between max-sm:p-4">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#242424] leading-snug max-sm:text-base">
                  Grow Your Garage. Reach More Customers.
                </h2>
                <p className="text-[#5C5C5C] mt-3 sm:mt-4 text-base sm:text-lg max-sm:text-sm">
                  Join VahanWire and start receiving service <br />
                  requests instantly.
                </p>
              </div>
              <div className="mt-6 sm:mt-8 max-sm:mt-4">
                <p className="font-bold text-[#242424] mb-3 text-sm sm:text-base max-sm:text-xs">
                  Download Provider App
                </p>
                <div className="flex gap-2 flex-wrap">
                  <img
                    src={AppStore}
                    alt="App Store"
                    loading="lazy"
                    className="h-14 sm:h-16 flex-shrink-0 max-sm:h-10"
                  />
                  <img
                    src={GooglePlay}
                    alt="Google Play"
                    loading="lazy"
                    className="h-14 sm:h-16 flex-shrink-0 max-sm:h-10"
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

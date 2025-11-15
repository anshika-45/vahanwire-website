import React from "react";
import AddImage from "../assets/addbanner.webp";
import AppStore from "../assets/Apple.svg";
import GooglePlay from "../assets/Playstore.svg";
const AddBanner = () => {
  return (
    <>
      <section className="w-full pt-40 mt-40 flex justify-center relative max-md:pt-50 max-md:mt-60 max-sm:pt-0 max-sm:mt-0 max-sm:pb-8">
        <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-b from-white to-[#00AB11] opacity-50 hidden sm:block"></div>
        <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-b from-white to-[#157EFD] opacity-50 hidden sm:block"></div>
        <div
          className="w-[95%] sm:w-[90%] md:w-full max-w-screen-xl rounded-3xl overflow-hidden shadow-lg absolute lg:-bottom-52 sm:-bottom-61 -bottom-100 z-10 bg-center mt-20 sm:mt-28 md:mt-40
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
          <div className="grid grid-cols-1 lg:grid-cols-2  lg:gap-10 gap-5 lg:py-12 py-6 px-7  md:px-15">
            <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-8 flex flex-col justify-between">
              <div>
                <h2 className="md:text-xl text-sm  lg:text-3xl font-bold text-[#242424]">
                  Your Vehicle's Best Friend — <br /> In One App
                </h2>
                <p className="text-[#5C5C5C] mt-2 md:mt-4 lg:text-lg text-[17px]">
                  Find nearby mechanics, book services, get on-road <br />
                  assistance, and manage your vehicle
                </p>
              </div>
              <div className="mt-2 lg:mt-8">
                <p className="font-bold text-[#242424] mb-3 text-xs md:text-base">
                  Download User App
                </p>
                <div className="flex gap-2 flex-wrap">
                  <a
                    href="https://apps.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download on App Store"
                    className="inline-block hover:opacity-80 transition"
                  >
                    <img
                      loading="lazy"
                      src={AppStore}
                      alt="App Store"
                      role="img"
                      width="108"
                      height="40"
                      className="h-10 sm:h-12 lg:h-16 w-auto shrink-0"
                    />
                  </a>
                  <a
                    href="https://play.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Get it on Google Play"
                    className="inline-block hover:opacity-80 transition"
                  >
                    <img
                      loading="lazy"
                      src={GooglePlay}
                      alt="Google Play"
                      role="img"
                      width="108"
                      height="40"
                      className="h-10 sm:h-12 lg:h-16 w-auto shrink-0"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-8 flex flex-col justify-between ">
              <div>
                <h2 className="md:text-xl text-sm  lg:text-3xl font-bold text-[#242424]">
                  Grow Your Garage. Reach More Customers.
                </h2>
                <p className="text-[#5C5C5C] mt-2 md:mt-4 lg:text-lg text-[17px]">
                  Join VahanWire and start receiving service <br />
                  requests instantly.
                </p>
              </div>
              <div className="mt-2 lg:mt-8">
                <p className="font-bold text-[#242424] mb-3 text-xs sm:text-sm md:text-base">
                  Download Provider App
                </p>
                <div className="flex gap-2 flex-wrap">
                  <a
                    href="https://apps.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download on App Store"
                    className="inline-block hover:opacity-80 transition"
                  >
                    <img
                      src={AppStore}
                      alt="App Store"
                      role="img"
                      loading="lazy"
                      width="108"
                      height="40"
                      className="h-10 sm:h-12 lg:h-16 w-auto shrink-0"
                    />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.vahanwireprovider"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Get it on Google Play"
                    className="inline-block hover:opacity-80 transition"
                  >
                    <img
                      src={GooglePlay}
                      alt="Google Play"
                      role="img"
                      loading="lazy"
                      width="108"
                      height="40"
                      className="h-10 sm:h-12 lg:h-16 w-auto shrink-0"
                    />
                  </a>
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

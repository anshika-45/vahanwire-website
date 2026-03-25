import React from "react";
import { S3_IMAGES } from "../constants/images";
import PageBanner from "../components/PageBanner";

const blankImg =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'></svg>";

export default function FindMechanic() {
  return (
    <div className="duration-300 ease-in transition-all pb-12 md:pb-16 lg:pb-7 xl:mb-0 mb-10">
      <PageBanner
        title=""
        image={blankImg}
        useDarkOverlay={false}
        height="0px"
        showTicker={true}
        className="pt-0 mt-0"
      />

      <div className="container">
        <div className="flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 pt-4 sm:pt-8 md:pt-12">
          <div className="relative w-full max-w-5xl mx-auto">
            <div className="lg:grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center flex flex-col-reverse">
              <div className="relative text-center lg:text-left">
                <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl py-1 mb-2 sm:mb-3">
                  We're Coming With
                </h2>
                <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl py-1 mb-2 sm:mb-3">
                  Real time
                </h2>
                <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6 items-center lg:items-end pb-1 mb-3 sm:mb-4">
                  <h3 className="font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-[linear-gradient(to_right,#dc2626_0%,#ca8a04_20%,#16a34a_40%,#2563eb_100%)]">
                    BIDDING
                  </h3>
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 leading-relaxed">
                  Ab Mechanic bhi choose kro, <br></br> Apne Price par!
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-lg mb-6 md:mb-8 text-gray-700">
                  Coming Soon on App Store & Play Store
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 items-center justify-center lg:justify-start">
                  <div className="w-32 sm:w-40 md:w-48">
                    <a
                      href="https://www.apple.com/in/app-store/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                        src={S3_IMAGES.APPSTORE}
                        alt="Download on App Store"
                      />
                    </a>
                  </div>
                  <div className="w-32 sm:w-40 md:w-48">
                    <a
                      href="https://play.google.com/store/games?device=windows"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                        src={S3_IMAGES.PLAYSTORE}
                        alt="Get it on Google Play"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="relative flex justify-center lg:justify-end mb-6 lg:mb-0">
                <div className="w-full sm:w-3/4 md:w-4/5 lg:w-full max-w-sm lg:max-w-none">
                  <img
                    className="w-full h-auto object-contain animate-float"
                    src={S3_IMAGES.COMMING_SOON}
                    alt="Coming Soon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

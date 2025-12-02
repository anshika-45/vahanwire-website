import React from "react";
import { S3_IMAGES } from "../constants/images";
import PageBanner from "../components/PageBanner";  

const blankImg =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'></svg>";

export default function Mechanic() {
  return (
    <div className="duration-300 ease-in transition-all lg:pb-7 pb-20 xl:mb-0 mb-10">
      <PageBanner
        title=""
        image={blankImg}
        useDarkOverlay={false}
        height="0px"
        showTicker={true}
         className="pt-0 mt-0"
      />

      <div className="container">
        <div className="flex flex-col items-center justify-center px-2 lg:pt-30 pt-10">
          <div className="relative w-full max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 lg:gap-20 items-center">
              <div className="relative text-center lg:text-left">
                <h2 className="font-bold lg:text-5xl md:text-3xl text-xl py-1 mb-3">
                  We're Coming With
                </h2>
                <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-end pb-1 mb-3">
                  <h3 className="font-bold lg:text-8xl md:text-6xl text-4xl text-transparent bg-clip-text bg-[linear-gradient(to_right,#dc2626_0%,#ca8a04_20%,#16a34a_40%,#2563eb_100%)]">
                    BIDDING
                  </h3>
                  <span className="h-2 lg:w-20 w-32 bg-black lg:block hidden"></span>
                  <span className="h-2 lg:w-0 w-32 bg-black block lg:hidden"></span>
                </div>
                <p className="lg:text-2xl md:text-xl text-[17px] mb-6">
                  Choose Your Mechanic, Your Price, Your Way!
                </p>
                <p className="lg:mt-6 mt-4 text-lg mb-8">
                  Coming Soon on App Store & Play Store
                </p>
                <div className="flex gap-5 flex-wrap items-center justify-center lg:justify-start">
                  <div className="w-[170px] md:w-[180px]">
                    <a href="https://www.apple.com/in/app-store/" target="_blank" rel="noopener noreferrer">
                      <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" src={S3_IMAGES.APPSTORE} alt="Download on App Store" />
                    </a>
                  </div>
                  <div className="w-[170px] md:w-[180px]">
                    <a href="https://play.google.com/store/games?device=windows" target="_blank" rel="noopener noreferrer">
                      <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" src={S3_IMAGES.PLAYSTORE} alt="Get it on Google Play" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="relative flex justify-center lg:justify-end">
                <div className="lg:w-full w-3/4 max-w-[400px]">
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
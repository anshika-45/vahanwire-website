import React from "react";
import comingSoon from "../assets/comingSoonBidding.svg";
import appStore from "../assets/Apple.svg";
import playStore from "../assets/Playstore.svg";
import mobileCentered from "../assets/mobileCentered.svg";
import mobileAside from "../assets/mobileAside.svg";
import threef from "../assets/385.svg";
import fouref from "../assets/485.svg";
import sixef from "../assets/685.svg";
import { Link } from "react-router-dom";
const PageBanner = React.lazy(() => import("../components/PageBanner"));
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
      />
      <div className="container">
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-x-5 gap-y-40 px-2 lg:pt-30 pt-10 items-center">
          <div className="relative xl:text-start text-center">
            <div className="absolute -top-[60px] translate-y-[30px] xl:right-5 lg:right-20 md:right-40 right-2 translate-x-5 lg:w-[150px] md:w-[100px] w-[50px]">
              <img className="w-full h-full" src={comingSoon} alt="" />
            </div>
            <h2 className="font-bold lg:text-5xl md:text-3xl text-xl py-1 mb-3">
              We're Coming With
            </h2>
            <div className="flex gap-6 items-center xl:justify-start justify-center pb-1 mb-3">
              <h3 className="font-bold lg:text-8xl md:text-5xl text-4xl text-transparent bg-clip-text bg-[linear-gradient(to_right,#dc2626_0%,#ca8a04_20%,#16a34a_40%,#2563eb_100%)]   ">
                BIDDING
              </h3>
              <span className="h-2 px-7 md:block hidden  bg-black"></span>
            </div>
            <p className="lg:text-2xl md:text-xl text-[17px] ">
              Choose Your Mechanic, Your Price, Your Way!
            </p>
            <p className="lg:mt-10 mt-4 text-lg">
              Coming Soon on App Store & Play Store
            </p>
            <div className="flex gap-5 mt-3 flex-wrap items-center xl:justify-start justify-center">
              <div className="w-[170px]">
                <a href="https://www.apple.com/in/app-store/">
                  <img
                    className="w-full h-full object-cover"
                    src={appStore}
                    alt=""
                  />
                </a>
              </div>
              <div className="w-[170px]">
                <a href="https://play.google.com/store/games?device=windows">
                  <img
                    className="w-full h-full object-cover"
                    src={playStore}
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="relative px-3 aspect-[4/3] ">
            <img
              className="h-full p-2 w-full md:object-cover"
              src={mobileAside}
              alt=""
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
              <div className="mech-img-animation3 absolute lg:block hidden top-1/2 z-10">
                <img className="h-full w-full" src={threef} alt="" />
              </div>
              <div className="mech-img-animation4 absolute lg:block hidden z-10">
                <img className="h-full w-full" src={fouref} alt="" />
              </div>
              <div className="mech-img-animation6 absolute lg:block hidden bottom-10 z-10">
                <img className="h-full w-full" src={sixef} alt="" />
              </div>
              <img
                className="xl:h-full w-full lg:scale-110 xl:scale-100 object-cover"
                src={mobileCentered}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

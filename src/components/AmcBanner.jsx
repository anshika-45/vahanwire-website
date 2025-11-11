import React from "react";
import amcImage from "../assets/Drive.webp";
import logo from "../assets/blurlogo.webp";
import Button from "./Button";
const AmcBanner = ({ onBuy }) => {
    return (
        <section className="w-full py-6 sm:py-8 md:py-10 bg-white flex justify-center  sm:mb-8">
            <div className="relative w-[95%] sm:w-[90%] md:w-[85%] max-w-7xl rounded-3xl overflow-hidden shadow-lg">
                <img
                    src={amcImage}
                    alt="Drive worry-free with Vahanwire AMC. Get annual maintenance, priority support, and on-road assistance. Buy Now."
                    loading="eager"
                    className="w-full h-[200px] sm:h-[280px] md:h-[380px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#AD0100]/40 via-[#000000]/10 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col text-justify justify-center px-4 sm:px-8 md:px-10 lg:px-16 text-white">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 leading-tight">
                        DRIVE WORRY-FREE <br /> WITH VAHANWIRE AMC
                    </h2>
                    <p className="text-xs sm:text-sm md:text-xs max-w-xs sm:max-w-sm mb-3 sm:mb-4">
                        Get Annual Maintenance, Priority Support, And On-Road Assistance<br></br> — All Under
                        One Affordable Plan Designed For Your Vehicle.
                    </p>
                    <div className="w-fit">
                        <Button text="Buy Now" className="text-black font-bold bg-[#FBBA01] p-2 sm:p-3 px-4 sm:px-6 text-xs sm:text-sm" onClick={onBuy} />
                    </div>
                </div>
                <img loading="lazy"
                    src={logo}
                    alt=""
                    className="absolute right-0 transform top-1/2 translate-y-15 w-20 sm:w-28 md:w-36 h-auto opacity-90 flex-shrink-0"
                />
            </div>
        </section>
    );
};
export default AmcBanner;

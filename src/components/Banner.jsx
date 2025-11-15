import React, { lazy, Suspense } from "react";
import bannerImg from "../assets/HomeBanner.webp";
import { useNavigate } from "react-router-dom";
const AnimatedText = lazy(() => import("./AnimatedText"));

const bannerTexts = [
  "Car Service",
  "Bike Repairs",
  "Towing Help",
  "Emergency Fuel",
];

const Banner = React.memo(() => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      <div>
        <div
          className="relative w-full h-[79vh] sm:h-[80vh] md:h-[80vh] bg-center bg-cover overflow-hidden bg-gray-100"
          style={{
            backgroundImage: `url(${bannerImg})`,
            backgroundAttachment: "fixed",
            willChange: "background-image",
            contentVisibility: "auto",
          }}
        >
          <div className="container">
            <div className="absolute left-0 top-[40%] -translate-y-1/2 text-white w-full">
              <div className="container">
                {/* Heading */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl leading-tight drop-shadow-lg py-2 md:my-6 font-semibold">
                  Your One-Stop <br /> Solution for
                </h1>

                {/* Animated Text */}
                <div className="max-w-[350px] md:max-w-[450px]">
                  <Suspense fallback={<div className="h-16 md:h-24"></div>}>
                    <AnimatedText
                      texts={bannerTexts}
                      interval={500}
                      duration={1000}
                      outMs={360}
                      inMs={540}
                      animationClass="scale-90"
                      className="transform origin-center transition-transform duration-400 overflow-visible text-4xl sm:text-6xl md:text-7xl font-semibold"
                    />
                  </Suspense>
                </div>

                {/* Description */}
                <p className="md:my-4 py-4 text-sm sm:text-lg md:text-xl max-w-2xl drop-shadow-md leading-relaxed">
                  Book trusted professionals near you for on-time, affordable,
                  <br />
                  and hassle-free vehicle & home services — anytime, anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Banner.displayName = "Banner";
export default Banner;

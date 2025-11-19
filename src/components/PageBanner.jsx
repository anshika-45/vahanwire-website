import React, { useState } from "react";
import PropTypes from "prop-types";
import "../index.css";

const PageBanner = ({
  title = "Coming Soon",
  image,
  useGradientTitle = true,
  useDarkOverlay = true,
  height = null,
  showTicker = true,
}) => {
  const [loaded, setLoaded] = useState(false);

  const responsiveHeight = "h-[40vh] sm:h-[40vh] md:h-[60vh] lg:h-[70vh]";

  const blurImage = `${image}?w=20&format=webp&q=5`;

  return (
    <section
      className={`relative w-full overflow-hidden ${
        height ? "" : responsiveHeight
      }`}
      aria-label={`${title} banner`}
      style={height ? { minHeight: height } : undefined}
    >
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center blur-xl scale-110"
        style={{ backgroundImage: `url(${blurImage})` }}
      />

      <img
        src={`${image}?w=1600&format=webp&q=70`}
        alt={title}
        loading="eager"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        width="1600"
        height="800"
        srcSet={`
          ${image}?w=400&format=webp&q=50 400w,
          ${image}?w=800&format=webp&q=60 800w,
          ${image}?w=1200&format=webp&q=65 1200w,
          ${image}?w=1600&format=webp&q=70 1600w
        `}
        sizes="100vw"
      />

      {useDarkOverlay && (
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      )}

      {showTicker && (
        <div className="relative z-10">
          <div className="ticker-container">
            <div className="ticker">
              <div className="ticker__move">
                {[...Array(15)].map((_, i) => (
                  <span
                    key={i}
                    className="ticker-item text-xs sm:text-sm md:text-base font-normal"
                  >
                    Coming Soon&nbsp;&nbsp;|&nbsp;&nbsp;
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Title */}
      <div
        className={`relative z-10 flex items-center justify-center ${
          height ? "" : responsiveHeight
        }`}
        style={height ? { minHeight: height } : undefined}
      >
        <h1
          className={`text-center leading-tight banner-title ${
            useGradientTitle
              ? "gradient-text text-4xl sm:text-5xl md:text-6xl font-semibold"
              : "text-white text-3xl sm:text-4xl md:text-5xl font-semibold"
          }`}
        >
          {title}
        </h1>
      </div>
    </section>
  );
};

PageBanner.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string.isRequired,
  useGradientTitle: PropTypes.bool,
  useDarkOverlay: PropTypes.bool,
  height: PropTypes.string,
  showTicker: PropTypes.bool,
};

export default PageBanner;

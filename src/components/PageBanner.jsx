import React from "react";
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
  const responsiveHeight = "h-[40vh] sm:h-[40vh] md:h-[60vh] lg:h-[70vh]";

  return (
    <section
      className={`relative w-full overflow-hidden bg-gray-900 ${
        height ? "" : responsiveHeight
      }`}
      aria-label={`${title} banner`}
      style={{
        ...(height ? { minHeight: height } : {}),
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        willChange: 'background-image',
        contentVisibility: 'auto',
      }}
    >
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
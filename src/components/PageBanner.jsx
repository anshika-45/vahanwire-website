// src/components/PageBanner.jsx
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
  
  const responsiveHeightClasses = "h-[35vh] sm:h-[40vh] md:h-[60vh] lg:h-[70vh]";

  return (
    <section
      className={`relative w-full overflow-hidden ${height ? "" : responsiveHeightClasses}`}
      aria-label={title + " banner"}
      style={height ? { minHeight: height } : undefined}
    >

      <img
        src={image}
        alt="decorative image" 
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        loading="lazy"
        decoding="async"
      />

      <div
        className={`absolute inset-0 pointer-events-none ${
          useDarkOverlay ? "bg-black/40" : "bg-transparent"
        }`}
      />

      {showTicker && (
        <div className="relative z-10">
          <div className="ticker-container">
            <div className="ticker">
              <div className="ticker__move">
                {Array.from({ length: 7 }).map((_, i) => (
                  <span key={i} className="ticker-item">
                    Coming Soon&nbsp;&nbsp;|&nbsp;&nbsp;
                  </span>
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={`d${i}`} className="ticker-item">
                    Coming Soon&nbsp;&nbsp;|&nbsp;&nbsp;
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`relative z-10 flex items-center justify-center ${height ? "" : responsiveHeightClasses}`}
        style={height ? { minHeight: height } : undefined}
      >
        <h1
          className={`text-center leading-tight banner-title ${
            useGradientTitle
              ? "gradient-text text-4xl sm:text-5xl md:text-6xl font-extrabold"
              : "text-white text-3xl sm:text-4xl md:text-5xl font-bold"
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

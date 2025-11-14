import React from "react";
import PropTypes from "prop-types";
import "../index.css"; // keep this if you already have the CSS for ticker & animations

const PageBanner = ({
  title = "Coming Soon",
  image,
  useGradientTitle = true,
  useDarkOverlay = true,
  height = "500px",
  showTicker = true, 
}) => {
  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label={title + " banner"}
      style={{ minHeight: height }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${image})`,
          filter: useDarkOverlay ? "brightness(0.35)" : "none",
        }}
      />

      {/* Ticker — only rendered when showTicker is true */}
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

      {/* Centered large title */}
      <div
        className="relative z-10 flex items-center justify-center"
        style={{ minHeight: height }}
      >
        <h1
          className={`text-center leading-tight banner-title ${
            useGradientTitle ? "gradient-text text-5xl sm:text-6xl md:text-6xl font-extrabold" : "text-white text-4xl sm:text-2xl md:text-4xl font-bold"
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

import React from "react";
import { S3_IMAGES } from "../constants/images";
import "../index.css";

const PetrolPump = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-gray-900 h-[40vh] sm:h-[40vh] md:h-[60vh] lg:h-[70vh]"
      style={{
        backgroundImage: `url(${S3_IMAGES.PETROL_PUMP_BANNER})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        willChange: 'background-image',
        contentVisibility: 'auto',
      }}
    >
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
    
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
    
      <div className="relative z-10 flex items-center justify-center h-[40vh] sm:h-[40vh] md:h-[60vh] lg:h-[70vh]">
        <h1 className="text-center leading-tight banner-title gradient-text text-4xl sm:text-5xl md:text-6xl font-semibold">
          Coming Soon
        </h1>
      </div>
    </section>
  );
};

export default PetrolPump;
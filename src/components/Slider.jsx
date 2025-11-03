import React, { useState, useEffect, useCallback } from "react";
import mechanic from "../assets/oMechanic-Service.webp";
import amc from "../assets/oAMC.webp";
import towtruck from "../assets/oTow-Truck-Service.webp";
import leftIcon from "../assets/leftarrow.webp";
import rightIcon from "../assets/rightarrow.webp";
const slides = [
  { id: 1, title: "Mechanic Service", desc: "Instant roadside assistance.", img: mechanic },
  { id: 2, title: "AMC Plan", desc: "Annual Maintenance Contract.", img: amc },
  { id: 3, title: "Tow Truck Service", desc: "Fast, Reliable Towing.", img: towtruck },
  { id: 4, title: "Battery Jumpstart", desc: "Quick and safe power boost.", img: mechanic },
  { id: 5, title: "Flat Tyre Fix", desc: "On-the-spot repair and inflation.", img: towtruck },
];
export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => setIsSmallScreen(window.innerWidth < 640);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);
  return (
    <div
      className="relative w-full overflow-hidden py-12"
      onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
      onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
      onTouchEnd={() => {
        if (touchStart - touchEnd > 50) nextSlide();
        if (touchStart - touchEnd < -50) prevSlide();
      }}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * (isSmallScreen ? 100 : 34)}%)`,
        }}
      >
        {slides.map((s, index) => (
          <div
            key={s.id}
            className="w-[38%] sm:w-[60%] md:w-[45%] lg:w-[38%] flex-shrink-0 px-3"
            style={{
              width: isSmallScreen ? "100%" : "",
              transform: index === current + 1 ? "scale(1.02)" : "scale(1)",
              transition: "transform 0.5s",
            }}
          >
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-500">
              <img
                src={s.img}
                alt={`${s.title} - ${s.desc}`}
                loading="lazy"
                className="w-full h-50 sm:h-70 object-cover"
                width="400"
                height="280"
                decoding="async"
              />
            </div>
          </div>
        ))}
      </div>
      <button
      onClick={prevSlide}
      aria-label="Previous slide"
        className="absolute top-1/2 left-3 -translate-y-1/2 shadow-md p-3 rounded-full bg-white border-blue-200 border-1 hover:bg-gray-100 transition z-10"
      >
        <img src={leftIcon} loading="lazy" alt="previous" className="w-3 h-3" />
      </button>
      <button
      onClick={nextSlide}
      aria-label="Next slide"
        className="absolute top-1/2 right-3 -translate-y-1/2 shadow-md p-3 rounded-full bg-white border-blue-200 border-1 hover:bg-gray-100 transition z-10"
      >
        <img src={rightIcon} loading="lazy" alt="next" className="w-3 h-3" />
      </button>
      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-1">
        {slides.map((_, index) => (
          <button
          key={index}
          onClick={() => setCurrent(index)}
          aria-label={`Go to slide ${index + 1}`}
          className={`cursor-pointer transition-all border-none bg-transparent p-0 ${
          index === current
          ? "w-3 h-1 bg-[#266DDF] rounded"
              : "w-1 h-1 bg-gray-300 rounded-full"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

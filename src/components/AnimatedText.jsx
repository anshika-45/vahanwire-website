import React, { useState, useEffect, useCallback } from "react";
export default function AnimatedText({ texts = [], interval = 2500, animationClass = "scale-100" }) {
  const [index, setIndex] = useState(0);
  const updateIndex = useCallback(() => {
    setIndex((prev) => (prev + 1) % texts.length);
  }, [texts.length]);
  useEffect(() => {
    const timer = setInterval(updateIndex, interval);
    return () => clearInterval(timer);
  }, [updateIndex, interval]);
  return (
    <div className="relative h-16 min-h-16 right-4 -top-7 sm:h-25 md:h-30 lg:h-40 w-full xs:w-[95%] sm:w-[90%] md:w-[900px] flex items-center justify-start overflow-visible px-0 xs:px-1 sm:px-2 md:pb-0">
      {texts.map((text, i) => (
        <span
          key={i}
          className={`absolute text-3xl xs:text-4xl sm:text-7xl md:text-8xl font-medium bg-gradient-to-r from-[#1E9600] via-[#FFF200] to-[#FF0000] whitespace-nowrap bg-clip-text text-transparent
                      transition-all duration-800 ease-out
                      ${i === index ? animationClass + " opacity-100" : "scale-70 opacity-0"}`}
          style={{
            willChange: i === index ? 'transform, opacity' : 'auto', 
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
}

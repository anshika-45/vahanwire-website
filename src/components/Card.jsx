import React, { useState, useEffect } from "react";
import Card1Img from "../assets/Card1.svg";
import Card2Img from "../assets/Card2.svg";
import Card3Img from "../assets/Card3.svg";
import Card4Img from "../assets/Card4.svg";

const AnimatedCounter = ({ targetValue, isPercentage, isRating, isSuffix }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let currentValue = 0;
    const increment = Math.ceil(targetValue / 100);
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        setDisplayValue(targetValue);
        clearInterval(timer);
      } else {
        setDisplayValue(currentValue);
      }
    }, 150);

    return () => clearInterval(timer);
  }, [targetValue]);

  if (isPercentage) return `${displayValue}%`;
  if (isRating) return `${(displayValue / 10).toFixed(1)}★`;
  if (isSuffix) return `${displayValue.toLocaleString()}+`;
  return displayValue.toLocaleString();
};

const YellowCards = () => {
  const cardData = [
    { image: Card1Img, title: 98, description: "Customer Satisfaction", isPercentage: true },
    {
      image: Card2Img,
      title: 5000,
      description: "Active Service Providers",
      isSuffix: true,
    },
    { image: Card3Img, title: 48, description: "Average App Rating", isRating: true },
    { image: Card4Img, title: 100000, description: "Services Completed", isSuffix: true },
  ];
  return (
    <div
      className="
                 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
                 gap-3"
    >
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg flex flex-col items-center text-center shadow-md 
                     pb-6 pt-4 px-3  h-auto relative 
                     "
        >
          <div
            className="bg-[#FBBA01] w-24 sm:w-28 md:w-32 lg:w-35 h-24 sm:h-28 md:h-32 lg:h-35 
                       rounded-full flex items-center justify-center 
                       mb-3 sm:mb-4 md:mb-5 lg:mb-6 
                       max-sm:w-16 max-sm:h-16 max-sm:mb-2"
          >
            <img
              loading="lazy"
              src={card.image}
              alt=""
              className="w-12 sm:w-14 md:w-16 lg:w-18 h-12 sm:h-14 md:h-16 lg:h-18 object-contain 
                         max-sm:w-9 max-sm:h-9"
            />
          </div>
          <h3
            className="md:text-3xl text-lg text-[#242424] font-bold 
                         mb-1 sm:mb-1.5 md:mb-2 max-sm:text-base max-sm:mb-0.5"
          >
            <AnimatedCounter 
              targetValue={card.title} 
              isPercentage={card.isPercentage}
              isRating={card.isRating}
              isSuffix={card.isSuffix}
            />
          </h3>
          <p className="text-[#242424] text-xs sm:text-sm md:text-base max-sm:text-[10px]">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
};
export default YellowCards;

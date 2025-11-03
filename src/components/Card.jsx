import React from "react";
import Card1Img from "../assets/Card1.webp";
import Card2Img from "../assets/Card2.webp";
import Card3Img from "../assets/Card3.webp";
import Card4Img from "../assets/Card4.webp";
const YellowCards = () => {
  const cardData = [
    { image: Card1Img, title: "98%", description: "Customer Satisfaction" },
    { image: Card2Img, title: "5,000+", description: "Active Service Providers" },
    { image: Card3Img, title: "4.8★", description: "Average App Rating" },
    { image: Card4Img, title: "1,00,000+", description: "Services Completed" },
  ];
  return (
    <div
      className="max-w-7xl mx-auto px-3 sm:px-5 md:px-8 lg:px-10 
                 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
                 gap-3 sm:gap-4 md:gap-5 lg:gap-7 
                 max-sm:grid-cols-2 max-sm:gap-2"
    >
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg flex flex-col items-center text-center shadow-md 
                     p-4 sm:p-5 md:p-6 h-64 sm:h-72 md:h-80 relative 
                     max-sm:p-2 max-sm:h-48"
        >
          <div
            className="bg-[#FBBA01] w-24 sm:w-28 md:w-32 lg:w-35 h-24 sm:h-28 md:h-32 lg:h-35 
                       rounded-full flex items-center justify-center 
                       mb-3 sm:mb-4 md:mb-5 lg:mb-6 
                       max-sm:w-16 max-sm:h-16 max-sm:mb-2"
          >
            <img loading="lazy"
              src={card.image}
              alt={card.title}
              className="w-12 sm:w-14 md:w-16 lg:w-18 h-12 sm:h-14 md:h-16 lg:h-18 object-contain 
                         max-sm:w-9 max-sm:h-9"
            />
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-[#242424] font-bold 
                         mb-1 sm:mb-1.5 md:mb-2 max-sm:text-base max-sm:mb-0.5">
            {card.title}
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

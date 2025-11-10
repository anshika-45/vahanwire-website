import React, { useState, useEffect } from "react";
import Card1Img from "../assets/Card1.webp";
import Card2Img from "../assets/Card2.webp";
import Card3Img from "../assets/Card3.webp";
import Card4Img from "../assets/Card4.webp";

const YellowCards = () => {
  const [visibleCards, setVisibleCards] = useState(1); // Start with 1 card
  const [loadedImages, setLoadedImages] = useState({});

  const cardData = [
    { image: Card1Img, title: "98%", description: "Customer Satisfaction" },
    { image: Card2Img, title: "5,000+", description: "Active Service Providers" },
    { image: Card3Img, title: "4.8★", description: "Average App Rating" },
    { image: Card4Img, title: "1,00,000+", description: "Services Completed" },
  ];

  // ✅ OPTIMIZATION: Progressive loading of cards
  useEffect(() => {
    const timer1 = setTimeout(() => setVisibleCards(2), 100);
    const timer2 = setTimeout(() => setVisibleCards(3), 200);
    const timer3 = setTimeout(() => setVisibleCards(4), 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // ✅ OPTIMIZATION: Preload images
  useEffect(() => {
    cardData.forEach((card, index) => {
      const img = new Image();
      img.src = card.image;
      img.onload = () => {
        setLoadedImages(prev => ({ ...prev, [index]: true }));
      };
    });
  }, [cardData]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
      {cardData.slice(0, visibleCards).map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg flex flex-col items-center text-center shadow-md 
                     pb-6 pt-4 px-3 h-auto relative animate-fade-in"
          style={{ 
            animationDelay: `${index * 100}ms`,
            opacity: loadedImages[index] ? 1 : 0.7,
            transition: 'opacity 0.3s ease-in'
          }}
        >
          <div
            className="bg-[#FBBA01] w-24 sm:w-28 md:w-32 lg:w-35 h-24 sm:h-28 md:h-32 lg:h-35 
                       rounded-full flex items-center justify-center 
                       mb-3 sm:mb-4 md:mb-5 lg:mb-6 
                       max-sm:w-16 max-sm:h-16 max-sm:mb-2"
          >
            {/* ✅ OPTIMIZATION: Full image optimization */}
            <img
              loading="lazy"
              src={card.image}
              alt={card.title}
              width={72}        // ✅ Added - max width
              height={72}       // ✅ Added - max height
              decoding="async"  // ✅ Added
              className="w-12 sm:w-14 md:w-16 lg:w-18 h-12 sm:h-14 md:h-16 lg:h-18 object-contain 
                         max-sm:w-9 max-sm:h-9 transition-opacity duration-300"
              style={{ 
                opacity: loadedImages[index] ? 1 : 0.5 
              }}
              onLoad={() => setLoadedImages(prev => ({ ...prev, [index]: true }))}
            />
          </div>
          <h3
            className="md:text-3xl text-lg text-[#242424] font-bold 
                         mb-1 sm:mb-1.5 md:mb-2 max-sm:text-base max-sm:mb-0.5"
          >
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

// ✅ Add CSS for fade-in animation
const styles = `
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default React.memo(YellowCards); // ✅ Memoize component
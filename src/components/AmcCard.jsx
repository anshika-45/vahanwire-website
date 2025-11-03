import React, { useState } from "react";
import { Check } from "lucide-react";
import VerifyNumberPopup from "../popup/VerifyNumberPopup";
import essentialPlanImg from "../assets/Essentialplan.webp";
const AMCCard = ({
  title,
  vehicleNumber,
  validFor,
  price,
  originalPrice,
  discount,
  periodLabel,
  features,
  bgColor,
  hoverBgColor,
  isEssential = false,
  onBuy,
  vehicleType = "car",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative overflow-visible flex justify-center">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`rounded-lg p-4 shadow-lg text-white flex flex-col h-full w-[300px] relative transition-all duration-700 ease-in-out`}
        style={{
          backgroundImage: isHovered ? hoverBgColor : bgColor,
          backgroundSize: "200% 200%",
          backgroundPosition: isHovered ? "100% 50%" : "0% 50%",
        }}
      >
        <div className="absolute left-0 top-4 bg-white rounded-r-full w-20 h-13 flex items-center justify-end pr-5 shadow-md z-10">
          <img loading="lazy"
            src="/src/assets/Logo1.webp"
            alt="Logo"
            className="w-9 h-9 object-contain"
          />
        </div>
        <div className="flex justify-end items-start mb-4 relative">
          <img loading="lazy"
            src="/src/assets/back-logo.webp"
            alt="Background Logo"
            className="absolute right-8 -top-10 w-34 h-32 object-contain opacity-60"
          />
          <div>
            <img loading="lazy"
              src={
                vehicleType === "bike"
                  ? "/src/assets/BikeAMC.webp"
                  : "/src/assets/carAMC.webp"
              }
              alt={vehicleType === "bike" ? "Bike" : "Car"}
              className="w-20 h-16 object-contain relative z-10"
            />
          </div>
        </div>
        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
        <div className="flex justify-between mb-3 pb-3 border-b border-white/30 border-dashed text-xs">
          <div>
            <div className="text-[#FFFFFF] mb-0.5">Vehicle Number</div>
            <div className="font-semibold text-base">{vehicleNumber}</div>
          </div>
          <div className="text-right">
            <div className="text-[#FFFFFF] mb-0.5">Valid For</div>
            <div className="font-semibold text-base">{validFor}</div>
          </div>
        </div>
        <div className="mb-3">
          <div className="flex items-baseline gap-2 mb-0.5">
            <span className="text-2xl font-semibold">
              ₹ {price.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            {originalPrice && (
              <span className="line-through text-white/70">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
            {discount && <span className="text-white/90">{discount}</span>}
            <span className="text-white/80">{periodLabel}</span>
          </div>
        </div>
        <div className="mb-3 flex-grow">
          <div className="font-normal mb-2 text-md">Plan Features</div>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-1.5">
                <div className="bg-[#32AB15] rounded-full p-0.5 mt-0.5 flex-shrink-0">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span className="text-xs leading-tight">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={onBuy}
          className="w-full bg-white text-[#266DDF] font-semibold py-3 text-sm rounded-lg hover:bg-gray-50 transition-colors"
        >
          Buy Now
        </button>
      </div>
      {isEssential && (
        <img loading="lazy"
          src={essentialPlanImg}
          alt="Essential Plan"
          className="absolute top-52 -right-2 h-7 w-auto z-20"
        />
      )}
    </div>
  );
};
const AMCCards = ({ vehicleType = "car", onBuy }) => {
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const handleBuy = (card) => {
    if (onBuy) {
      onBuy(card);
    } else {
      setIsVerifyOpen(true);
    }
  };
  const cards = [
    {
      title: "Premium Care",
      vehicleNumber: "00-00",
      validFor: "12 Months",
      price: 3499,
      originalPrice: 4999,
      discount: "30% Off",
      periodLabel: "/per year",
      features: [
        "Plan Start After 72 Hours",
        "Validity 365 Days",
        "Unlimited Services",
      ],
      bgColor: "linear-gradient(to bottom right, #8F6521, #A3762D)",
      hoverBgColor: "linear-gradient(to bottom right, #A3762D, #8F6521)",
      isEssential: false,
    },
    {
      title: "Standard Care",
      vehicleNumber: "00-00",
      validFor: "12 Months",
      price: 2549,
      originalPrice: 3999,
      discount: "15% Off",
      periodLabel: "/per year",
      features: [
        "Plan Start After 72 Hours",
        "Validity 365 Days",
        "Unlimited Services",
      ],
      bgColor: "linear-gradient(to bottom right, #252525, #404040)",
      hoverBgColor: "linear-gradient(to bottom right, #404040, #252525)",
      isEssential: true,
    },
    {
      title: "Basic Care",
      vehicleNumber: "00-00",
      validFor: "12 Months",
      price: 999,
      periodLabel: "/per year",
      features: [
        "Plan Start After 72 Hours",
        "Validity 365 Days",
        "Unlimited Services",
      ],
      bgColor: "linear-gradient(to bottom right, #3A5353, #4E7777)",
      hoverBgColor: "linear-gradient(to bottom right, #4E7777, #3A5353)",
      isEssential: false,
    },
  ];
  return (
    <div className="bg-gray-50 mt-0">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
          {cards.map((card, index) => (
            <AMCCard
              key={index}
              {...card}
              onBuy={() => handleBuy(card)}
              vehicleType={vehicleType}
            />
          ))}
        </div>
      </div>
      {!onBuy && (
        <VerifyNumberPopup
          isOpen={isVerifyOpen}
          onClose={() => setIsVerifyOpen(false)}
        />
      )}
    </div>
  );
};
export default AMCCards;

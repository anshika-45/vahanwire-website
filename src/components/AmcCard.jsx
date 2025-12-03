import React, { useState, useEffect } from "react";
import { useAmcData } from "../context/AmcDataContext";
import { useAMCPlans } from "../context/AmcPlanContext";
import { Check } from "lucide-react";
import VerifyNumberPopup from "../popup/VerifyNumberPopup";
import essentialPlanImg from "../assets/Essentialplan.svg";
import NoPlansFound from "../components/NoPlanFound";
const mapPlansToCards = (plans = [], vehicle = {}) => {
  if (!Array.isArray(plans) || plans.length === 0) return [];
  return plans.map((plan) => ({
    _id: plan?._id,
    title: plan?.planName,
    vehicleNumber: vehicle?.vehicleNumber || "00-00",
    validFor: plan?.planDurationInMonth
      ? `${plan.planDurationInMonth} Months`
      : "N/A",
    price: plan?.planPriceAfterDiscount || 0,
    originalPrice: plan?.planBasePrice || 0,
    discountPercent: plan?.discountPercent || 0,
    discount: plan?.planDiscountAmount || 0,
    totalAmount: plan?.planTotalAmount,
    gstPercent: plan?.planGSTPercent,
    gstAmount: plan?.planGSTAmount,
    planStart: plan?.planStart,
    periodLabel: "Off /per year",
    sorting: plan?.sorting ?? 999,
    servicesIncluded: Array.isArray(plan?.planServicesIncluded)
      ? plan.planServicesIncluded.map((s) => ({
          serviceName: s.serviceName,
          serviceType: s.serviceType,
          value: s.value,
          info: s.info,
        }))
      : [],
    features: Array.isArray(plan?.planFeatures)
      ? plan.planFeatures.flatMap((item) =>
          typeof item === "string" ? item.split(",").map((f) => f.trim()) : []
        )
      : typeof plan?.planFeatures === "string"
      ? plan.planFeatures.split(",").map((f) => f.trim())
      : [],
    bgColor:
      plan?.sorting == 1
        ? "linear-gradient(to bottom right, #8F6521, #A3762D)"
        : plan?.sorting == 2
        ? "linear-gradient(to bottom right, #252525, #404040)"
        : "linear-gradient(to bottom right, #3A5353, #4E7777)",
    hoverBgColor:
      plan?.sorting == 1
        ? "linear-gradient(to bottom right, #A3762D, #8F6521)"
        : plan?.sorting == 2
        ? "linear-gradient(to bottom right, #404040, #252525)"
        : "linear-gradient(to bottom right, #4E7777, #3A5353)",
  }));
};

const AMCCard = ({
  title,
  vehicleNumber,
  validFor,
  price,
  discount,
  periodLabel,
  originalPrice,
  discountPercent,
  features,
  bgColor,
  hoverBgColor,
  isEssential = false,
  onBuy,
  vehicleType = "car",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative overflow-visible flex justify-center flex-shrink-0"   onClick={onBuy}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`rounded-lg p-4 shadow-lg text-white flex flex-col h-full w-[270px] sm:w-[300px] md:w-[320px] relative transition-all duration-700 ease-in-out`}
        style={{
          backgroundImage: isHovered ? hoverBgColor : bgColor,
          backgroundSize: "200% 200%",
          backgroundPosition: isHovered ? "100% 50%" : "0% 50%",
        }}
      >
        <div className="absolute left-0 top-4 bg-white rounded-r-full w-20 h-13 flex items-center justify-end pr-5 shadow-md z-10">
          <img
            loading="lazy"
            src="/src/assets/Logo-AMC.svg"
            alt="Vahanwire Logo"
            className="w-9 h-9 object-contain"
          />
        </div>
        <div className="flex justify-end items-start mb-4 relative">
          <img
            loading="lazy"
            src="/src/assets/back-logo.webp"
            alt="Background decorative logo"
            className="absolute right-8 -top-10 w-34 h-32 object-contain opacity-60"
          />
          <div>
            <img
              loading="lazy"
              src={
                vehicleType === "bike"
                  ? "/src/assets/Bike-AMC.svg"
                  : "/src/assets/Car-AMC.svg"
              }
              alt={
                vehicleType === "bike" ? "Motorcycle AMC plan" : "Car AMC plan"
              }
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

          {(discount > 0 || discountPercent > 0 || originalPrice > price) && (
            <div className="flex items-center gap-2 text-xs">
              {originalPrice && originalPrice > price && (
                <span className="line-through text-white/70">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-white/90">{discountPercent}%</span>
              )}
              <span className="text-white/80">{periodLabel}</span>
            </div>
          )}
        </div>
        <div className="mb-3 flex-grow">
          <div className="font-normal mb-2 text-md">Plan Features</div>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-1.5">
                <div className="bg-[#32AB15] rounded-full p-0.5 mt-0.5 flex-shrink-0">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span className="text-[13px] md:text-[15px] leading-tight">
                  {feature}
                </span>
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
        <img
          loading="lazy"
          src={essentialPlanImg}
          alt="Essential Plan"
          className="absolute top-52 -right-2 h-7 w-auto z-20"
        />
      )}
    </div>
  );
};

const AMCCards = ({ onBuy, plans, vehicle, selectedCityName }) => {
  const { vehicleType, amcType } = useAmcData();
  const { fetchPlans, loading } = useAMCPlans();
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [cards, setCards] = useState([]);

  const handleBuy = (card) => {
    if (onBuy) {
      onBuy(card);
    } else {
      setIsVerifyOpen(true);
    }
  };

  useEffect(() => {
    const loadPlans = async () => {
      if (plans && Array.isArray(plans) && plans.length > 0) {
        const mapped = mapPlansToCards(plans, vehicle);
        mapped.sort((a, b) => a.sorting - b.sorting);
        setCards(mapped);
        return;
      }

      if (!vehicleType || !amcType) {
        return;
      }

      if (!selectedCityName) {
        setCards([]);
        return;
      }

      const fetched = await fetchPlans(vehicleType, amcType, selectedCityName);
      const mapped = mapPlansToCards(fetched, vehicle);
      mapped.sort((a, b) => a.sorting - b.sorting);
      setCards(mapped);
    };

    loadPlans();
  }, [plans, vehicle, vehicleType, amcType, fetchPlans, selectedCityName]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">Loading plans...</div>
    );
  }

  if (!cards || cards.length === 0) {
    return <NoPlansFound cityName={selectedCityName} />;
  }

  return (
    <div className="mt-0">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex overflow-x-auto scroll-smooth gap-4 sm:gap-6 max-w-[1180px]  justify-around">
          {cards.map((card, index) => (
            <AMCCard
              key={card._id || index}
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
      <style>
        {`
          .flex::-webkit-scrollbar {
            display: none;
          }
          .flex {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default AMCCards;

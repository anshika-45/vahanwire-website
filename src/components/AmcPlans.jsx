import React from "react";
import AmcCard from "./AmcCard";
import logo from "../assets/logo.webp"; 
import carIcon from "../assets/car-white.webp"; 
export default function AmcPlans() {
  const plans = [
    {
      title: "Premium Care",
      vehicle: "00-00",
      validity: "12 Months",
      price: 3499,
      oldPrice: 4999,
      discount: "₹4,999 30% Off / per year",
      features: [
        "Plan Start After 72 Hours",
        "Validity 365 Days",
        "Unlimited Services",
      ],
      bgColor: "bg-[#A6732E]", 
      logo: logo,
      vehicleIcon: carIcon,
    },
    {
      title: "Standard Care",
      vehicle: "00-00",
      validity: "12 Months",
      price: 2549,
      oldPrice: 2999,
      discount: "₹2,999 15% Off / per year",
      features: [
        "Plan Start After 72 Hours",
        "Validity 365 Days",
        "Unlimited Services",
      ],
      bgColor: "bg-[#2F2F2F]", 
      logo: logo,
      vehicleIcon: carIcon,
      highlight: "Essential Plan",
    },
    {
      title: "Basic Care",
      vehicle: "00-00",
      validity: "12 Months",
      price: 999,
      discount: "/per year",
      features: [
        "Plan Start After 72 Hours",
        "Validity 365 Days",
        "Unlimited Services",
      ],
      bgColor: "bg-[#2E5E53]", 
      logo: logo,
      vehicleIcon: carIcon,
    },
  ];
  return (
    <div className="flex justify-center flex-wrap gap-10 py-16 bg-white px-4 sm:px-6 lg:px-8">
      {plans.map((plan, index) => (
        <div
          key={index}
          className="w-full sm:w-[90%] md:w-[45%] lg:w-auto flex justify-center"
        >
          <AmcCard plan={plan} />
        </div>
      ))}
    </div>
  );
}

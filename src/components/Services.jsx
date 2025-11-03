import React from "react";
import Tile from "./Tile";
import amcIcon from "../assets/service-amc.webp";
import mechanicIcon from "../assets/service-mechanic.webp";
import towtruckIcon from "../assets/service-truck.webp";
import patrolIcon from "../assets/service-pump.webp";
import serviceIcon from "../assets/service-center.webp";
import ecommerceIcon from "../assets/service-cart.webp";
const servicesData = [
  {
    icon: amcIcon,
    title: "AMC",
    desc: "Locate verified mechanics near you for instant repairs at home or on-road.",
    linkText: "Buy AMC",
  },
  {
    icon: mechanicIcon,
    title: "Find Mechanic",
    desc: "Locate verified mechanics near you for instant repairs at home or on-road.",
    linkText: "Find Now",
  },
  {
    icon: patrolIcon,
    title: "Patrol Pump",
    desc: "Find nearby fuel stations and get fuel delivery in select areas.",
    linkText: "Find Now",
  },
  {
    icon: towtruckIcon,
    title: "Tow Truck",
    desc: "Stuck on the road? Get fast, GPS-tracked towing support anytime.",
    linkText: "Find Now",
  },
  {
    icon: serviceIcon,
    title: "Service Centre",
    desc: "Book appointments with trusted car & bike service centers in your city.",
    linkText: "Book Service",
  },
  {
    icon: ecommerceIcon,
    title: "E-Commerce",
    desc: "Get exclusive deals on automotive parts and accessories online.",
    linkText: "Book Service",
  },
];
const Services = React.memo(() => {
  return (
    <div className="justify-items-center py-8 sm:py-12 md:py-[75px] h-auto bg-[#FFFFFF]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-6 md:px-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-center text-[#242424]">
          Our Main Services
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5C5C] text-center pt-2 md:pt-4">
          Explore a full range of essential vehicle and home services —<br />
          from mechanic support to doorstep repairs, towing, payments, and more.
        </p>
        <div className="mt-6 sm:mt-8 md:mt-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-[30px] justify-items-center">
          {servicesData.map((service, index) => (
            <Tile key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
});
Services.displayName = 'Services';
export default Services;

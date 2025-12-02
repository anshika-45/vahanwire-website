import React from "react";
import Tile from "./Tile";
import amcIcon from "../assets/Tile1.svg";
import mechanicIcon from "../assets/Tile2.svg";
import patrolIcon from "../assets/Tile3.svg";
import towtruckIcon from "../assets/Tile4.svg";
import serviceIcon from "../assets/Tile5.svg";
import ecommerceIcon from "../assets/Tile6.svg";
const servicesData = [
  {
    icon: amcIcon,
    title: "AMC",
    desc: "Your vehicle's yearly care plan - simple, affordable, dependable.",
    linkText: "Buy AMC",
    linkHref: "/vehicle-amc",
  },
  {
    icon: mechanicIcon,
    title: "Mechanic",
    desc: "Locate verified mechanics near you for instant repairs at home or on-road.",
    linkText: "View Details",
    linkHref: "/mechanic",
  },
  {
    icon: towtruckIcon,
    title: "Tow Truck",
    desc: "Stuck on the road? Get fast, GPS-tracked towing support anytime.",
    linkText: "View Details",
    linkHref: "/tow-truck",
  },
  {
    icon: ecommerceIcon,
    title: "E-Commerce",
    desc: "One-stop shop for all your vehicle accessories, parts & maintenance products.",
    linkText: "View Details",
    linkHref: "/e-commerce",
  },
  {
    icon: patrolIcon,
    title: "Petrol Pump",
    desc: "Find nearby fuel stations and get fuel delivery in selected areas.",
    linkText: "View Details",
    linkHref: "/petrol-pump",
  },
  {
    icon: serviceIcon,
    title: "Service Center",
    desc: "Book appointments with trusted car & bike service centers in your city.",
    linkText: "View Details",
    linkHref: "/service-center",
  },
];
const Services = React.memo(() => {
  return (
    <div className="justify-items-center pt-7 md:pt-10 pb-10 mt-4 sm:mt-6 md:mt-4 h-auto bg-[#FFFFFF] duration-300 transition-all ease-in">
      <div className="container">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-center text-[#242424]">
          Our Main Services
        </h1>
        <div className="flex items-center justify-center">
          <p className="text-[14px] sm:text-lg md:text-md text-[#5C5C5C] text-center pt-2 md:pt-4 lg:w-[50%] md:w-[60%] w-[90%]">
          Explore a full range of essential vehicle and home services —
          from mechanic support to doorstep repairs, towing, payments, and more.
        </p> 
        </div>
        <div className="mt-7 sm:mt-8 md:mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-[30px] justify-items-center">
          {servicesData.map((service, index) => (
            <Tile key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
});
Services.displayName = "Services";
export default Services;

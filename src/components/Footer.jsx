import React, { useState } from "react";
import logo from "../assets/Footerlogo.webp";
import bgImg from "../assets/Footerbg.webp";
import { Link } from "react-router-dom";
import FooterIcons from "./FooterIcons";
import { MapPin, Phone, MailOpenIcon, ChevronDown } from "lucide-react";
const Footer = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const toggleSection = (section) => {
    setExpandedSections((prev) => {
      const newState = {
        quickLinks: false,
        forUser: false,
        forMechanic: false,
        contact: false,
      };
      newState[section] = !prev[section];
      return newState;
    });
  };
  return (
    <footer className="relative h-auto text-white">
      <div className="absolute inset-0 bg-black z-0"></div>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80 z-0"
        style={{ backgroundImage: `url(${bgImg})` }}
      ></div>
      <div className="relative container  flex flex-col justify-between">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-x-4 gap-y-12 md:pt-40 md:mt-30 sm:pt-6">
          <div className="h-auto mb-8 sm:mb-6 md:mb-0">
            <img loading="lazy" src={logo} alt="Logo" className="w-40 sm:w-48 md:w-54 mb-4 sm:mb-6" />{" "}
            <p className="text-gray-300 text-xs sm:text-sm leading-tight mb-4 sm:mb-6 space-y-0.5">
              VahanWire connects you to nearby
              <br />
              mechanics, fuel, services, payments, and
              <br />
              auto parts — in one Platform.
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 ">Follow Us</h2>
            <div className="flex space-x-4">
              <FooterIcons />
            </div>
          </div>
          <div className="  mb-6 md:mb-0">
            <button
              onClick={() => toggleSection("quickLinks")}
              className="flex items-center justify-between w-full md:w-auto md:pointer-events-none"
            >
              <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Quick Links</h3>
              <ChevronDown
                size={18}
                className={`md:hidden transition-transform ${
                  expandedSections.quickLinks ? "rotate-180" : ""
                }`}
              />
            </button>
            <ul
              className={`space-y-3 sm:space-y-5 text-gray-300 text-xs sm:text-sm md:flex md:flex-col ${
                expandedSections.quickLinks ? "flex flex-col" : "hidden"
              }`}
            >
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-condition" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div className="  mb-6 md:mb-0">
            <button
              onClick={() => toggleSection("forUser")}
              className="flex items-center justify-between w-full md:w-auto md:pointer-events-none"
            >
              <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">For User</h3>
              <ChevronDown
                size={18}
                className={`md:hidden transition-transform ${
                  expandedSections.forUser ? "rotate-180" : ""
                }`}
              />
            </button>
            <ul
              className={`space-y-3 sm:space-y-5 text-gray-300 text-xs sm:text-sm md:flex md:flex-col ${
                expandedSections.forUser ? "flex flex-col" : "hidden"
              }`}
            >
              <li>
                <Link to="/" className="hover:text-white transition">
                  Book A Service
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition">
                  Find Petrol Pumps
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition">
                  Find Nearby Service Station
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition">
                  Buy Vehicle Parts
                </Link>
              </li>
            </ul>
          </div>
          <div className="  mb-6 md:mb-0">
            <button
              onClick={() => toggleSection("forMechanic")}
              className="flex items-center justify-between w-full md:w-auto md:pointer-events-none"
            >
              <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">For Mechanic</h3>
              <ChevronDown
                size={18}
                className={`md:hidden transition-transform ${
                  expandedSections.forMechanic ? "rotate-180" : ""
                }`}
              />
            </button>
            <ul
              className={`space-y-3 sm:space-y-5 text-gray-300 text-xs sm:text-sm md:flex md:flex-col ${
                expandedSections.forMechanic ? "flex flex-col" : "hidden"
              }`}
            >
              <li>
                <Link to="/" className="hover:text-white transition">
                  Register As A Mechanic
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition">
                  Register As A Tow
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition">
                  Register Your Service Station
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition">
                  Register Petrol Pump
                </Link>
              </li>
            </ul>
          </div>
          <div className="  mb-6 md:mb-0">
            <button
              onClick={() => toggleSection("contact")}
              className="flex items-center justify-between w-full md:w-auto md:pointer-events-none"
            >
              <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Contact For AMC Support</h3>
              <ChevronDown
                size={18}
                className={`md:hidden transition-transform ${
                  expandedSections.contact ? "rotate-180" : ""
                }`}
              />
            </button>
            <ul
              className={`space-y-3 sm:space-y-5 text-gray-300 text-xs sm:text-sm md:flex md:flex-col ${
                expandedSections.contact ? "flex flex-col" : "hidden"
              }`}
            >
              <li className="flex items-start gap-2">
                <div className="bg-[#FBBA01] rounded-full p-2 flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-[#000000] sm:w-4 md:w-4" />
                </div>
                <a href="#" className="hover:text-white transition text-xs sm:text-sm">
                  Tower-B, Noida One, 819,<br /> Industrial Area, Sector 62,<br /> Noida,
                  Uttar Pradesh 201309
                </a>
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-[#FBBA01] rounded-full p-2 flex-shrink-0">
                  <MailOpenIcon size={14} className="text-[#000000] sm:w-4 md:w-4" />
                </div>
                <a
                  href="mailto:info@vahanwire.com"
                  className="hover:text-white transition"
                >
                  Info@Vahanwire.Com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-[#FBBA01] rounded-full p-2 flex-shrink-0">
                  <MailOpenIcon size={14} className="text-[#000000] sm:w-4 md:w-4" />
                </div>
                <a
                  href="mailto:amc@vahanwire.com"
                  className="hover:text-white transition"
                >
                  Amc@Vahanwire.Com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-[#FBBA01] rounded-full p-2 flex-shrink-0">
                  <Phone size={14} className="text-[#000000] sm:w-4 md:w-4" />
                </div>
                <a
                  href="tel:01203221368"
                  className="hover:text-white transition"
                >
                  0120 3221368
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-400 text-xs sm:text-sm mb-2 pt-8 sm:pt-16 md:pt-34 pb-4">
          <div
            className="w-full h-0.5 mb-4"
            style={{
              backgroundImage:
                "linear-gradient(to right, transparent 0%, #F80200 20%, #F8BA01 40%, #32AB15 60%, #4184ED 80%, transparent 100%)",
            }}
          ></div>
          © 2025 Vahanwire Technologies Private Limited - All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
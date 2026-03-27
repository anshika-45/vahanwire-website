import React, { useState, useEffect } from "react";
import { S3_IMAGES } from "../constants/images";
import { Link } from "react-router-dom";
import FooterIcons from "./FooterIcons";
import { MapPin, Phone, MailOpenIcon, ChevronDown } from "lucide-react";
// import RegisterMechanicForm from "../forms/RegisterMechanicForm";
// import RegisterTowPartnerForm from "../forms/RegisterTowPartnerForm";
// import RegisterServiceStationForm from "../forms/RegisterServiceStationForm";
// import RegisterPetrolPumpForm from "../forms/RegisterPetrolPumpForm";

const Footer = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [showMechanicForm, setShowMechanicForm] = useState(false);
  // const [showTowForm, setShowTowForm] = useState(false);
  // const [showServiceStationForm, setShowServiceStationForm] = useState(false);
  // const [showPetrolPumpForm, setShowPetrolPumpForm] = useState(false);

  useEffect(() => {
    const isAnyFormOpen = showMechanicForm;
    // showTowForm ||
    // showServiceStationForm ||
    // showPetrolPumpForm;
    if (isAnyFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [
    showMechanicForm,
    // showTowForm,
    // showServiceStationForm,
    // showPetrolPumpForm,
  ]);

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
    <>
      {showMechanicForm && (
        <RegisterMechanicForm onClose={() => setShowMechanicForm(false)} />
      )}
      <footer className="relative h-auto text-white px-3">
        <div className="absolute inset-0 bg-black z-0"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80 z-0"
          style={{ backgroundImage: `url(${S3_IMAGES.FOOTER_BG})` }}
        ></div>

        <div className="relative container flex flex-col justify-between">
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-x-4 gap-y-4 md:pt-40 md:mt-30 pt-10">
            <div className="h-auto mb-6 sm:mb-6 md:mb-0">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <img
                  loading="lazy"
                  src={S3_IMAGES.LOGO_FOOTER}
                  alt="Logo"
                  className="w-40 sm:w-48 md:w-54 mb-4 sm:mb-6 cursor-pointer"
                />
              </Link>
              <p className="text-gray-300 text-[15px] sm:text-base leading-tight mb-4 space-y-0.5">
                Vahanwire connects you to nearby mechanics, fuel, service
                centers — in one Platform.
              </p>
              <h2 className="text-lg sm:text-xl font-bold text-white sm:mb-3 py-2">
                Follow Us
              </h2>
              <div className="flex space-x-4 my-1">
                <FooterIcons />
              </div>
            </div>

            <div className="mb-4 md:mb-0 lg:pl-4">
              <button
                onClick={() => toggleSection("quickLinks")}
                className="flex items-center justify-between w-full md:w-auto md:pointer-events-none"
              >
                <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-4">
                  Quick Links
                </h3>
                <ChevronDown
                  size={18}
                  className={`md:hidden transition-transform ${
                    expandedSections.quickLinks ? "rotate-180" : ""
                  }`}
                />
              </button>

              <ul
                className={`space-y-2 sm:space-y-5 text-gray-300 text-xs sm:text-sm md:flex md:flex-col ${
                  expandedSections.quickLinks ? "flex flex-col" : "hidden"
                }`}
              >
                <li>
                  <Link
                    to="/"
                    className="hover:text-white transition py-1 block "
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about-us"
                    className="hover:text-white transition py-1 block"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-us"
                    className="hover:text-white transition py-1 block"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="hover:text-white transition py-1 block"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-condition"
                    className="hover:text-white transition py-1 block"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mb-4 md:mb-0">
              <button
                onClick={() => toggleSection("forUser")}
                className="flex items-center justify-between w-full md:w-auto md:pointer-events-none"
              >
                <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-4">
                  For User
                </h3>
                <ChevronDown
                  size={18}
                  className={`md:hidden transition-transform ${
                    expandedSections.forUser ? "rotate-180" : ""
                  }`}
                />
              </button>
              <ul
                className={`space-y-2 sm:space-y-5 text-gray-300 text-xs sm:text-sm md:flex md:flex-col ${
                  expandedSections.forUser ? "flex flex-col" : "hidden"
                }`}
              >
                <li>
                  <Link
                    to="/mechanic"
                    className="hover:text-white transition py-1 block"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Book A Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/petrol-pump"
                    className="hover:text-white transition py-1 block"
                  >
                    Find Petrol Pumps
                  </Link>
                </li>
                <li>
                  <Link
                    to="/service-center"
                    className="hover:text-white transition py-1 block"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Find Nearby Service Station
                  </Link>
                </li>
                <li>
                  <Link
                    to="/vahan-shop"
                    className="hover:text-white transition py-1 block"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Buy Vehicle Parts
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-4 md:mb-0">
              <button
                onClick={() => toggleSection("forMechanic")}
                className="flex items-center justify-between w-full md:w-auto md:pointer-events-none"
              >
                <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-4">
                  For Mechanic
                </h3>
                <ChevronDown
                  size={18}
                  className={`md:hidden transition-transform ${
                    expandedSections.forMechanic ? "rotate-180" : ""
                  }`}
                />
              </button>
              <ul
                className={`space-y-2 sm:space-y-5 text-gray-300 text-xs sm:text-sm md:flex md:flex-col ${
                  expandedSections.forMechanic ? "flex flex-col" : "hidden"
                }`}
              >
                <li>
                  <Link
                    to="/mechanic-app"
                    className="hover:text-white transition py-1 block text-left cursor-pointer"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Register As A Mechanic
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tow-truck"
                    className="hover:text-white transition py-1 block"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Register As A Tow
                  </Link>
                </li>
                <li>
                  <Link
                    to="/service-center"
                    className="hover:text-white transition py-1 block"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Register Your Service Station
                  </Link>
                </li>
                <li>
                  <Link
                    to="/petrol-pump"
                    className="hover:text-white transition py-1 block"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Register Petrol Pump
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mb-4 md:mb-0">
              {/* <button
              onClick={() => toggleSection("contact")}
              className="flex items-center justify-between w-full md:w-auto md:pointer-events-none"
            > */}
              <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-4">
                Contact For Any Support
              </h3>
              {/* <ChevronDown
                size={18}
                className={`md:hidden transition-transform ${
                  expandedSections.contact ? "rotate-180" : ""
                }`}
              /> 
            </button> */}
              <ul className="space-y-2 sm:space-y-5 text-gray-300 text-xs sm:text-sm md:flex md:flex-col">
                <li className="flex items-start gap-2">
                  <div className="bg-[#FBBA01] rounded-full p-2 flex-shrink-0 mt-0.5">
                    <MapPin
                      size={14}
                      className="text-[#000000] sm:w-4 md:w-4"
                    />
                  </div>
                  <a
                    href="https://maps.google.com/?q=Tower-B,+Noida+One,+819,+Industrial+Area,+Sector+62,+Noida,+Uttar+Pradesh+201309"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition text-xs sm:text-sm"
                  >
                    Tower-B, Noida One, 819,
                    <br /> Industrial Area, Sector 62,
                    <br /> Noida, Uttar Pradesh 201309
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-[#FBBA01] rounded-full p-2 flex-shrink-0">
                    <MailOpenIcon
                      size={14}
                      className="text-[#000000] sm:w-4 md:w-4"
                    />
                  </div>
                  <a
                    href="mailto:support@vahanwire.com"
                    className="hover:text-white transition"
                  >
                    support@vahanwire.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-[#FBBA01] rounded-full p-2 flex-shrink-0">
                    <MailOpenIcon
                      size={14}
                      className="text-[#000000] sm:w-4 md:w-4"
                    />
                  </div>
                  <a
                    href="mailto:info@vahanwire.com"
                    className="hover:text-white transition"
                  >
                    info@vahanwire.com
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

          <div className="text-center text-gray-400 text-xs sm:text-sm mb-2 pt-8 sm:pt-10 md:pt-16 pb-4">
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

        {/* {showMechanicForm && (
          <div className="fixed inset-0 backdrop-blur bg-transparent flex items-center justify-center z-50 px-4">
            <div className="w-auto max-w-5xl">
              <RegisterMechanicForm
                onClose={() => setShowMechanicForm(false)}
              />
            </div>
          </div>
        )} */}

        {/* {showTowForm && (
        <div className="fixed inset-0 backdrop-blur bg-transparent flex items-center justify-center z-50 px-4">
          <div className="w-auto max-w-5xl">
            <RegisterTowPartnerForm onClose={() => setShowTowForm(false)} />
          </div>
        </div>
      )} */}

        {/* {showServiceStationForm && (
        <div className="fixed inset-0 backdrop-blur bg-transparent flex items-center justify-center z-50 px-4">
          <div className="w-auto max-w-5xl">
            <RegisterServiceStationForm onClose={() => setShowServiceStationForm(false)} />
          </div>
        </div>
      )} */}

        {/* {showPetrolPumpForm && (
        <div className="fixed inset-0 backdrop-blur bg-transparent flex items-center justify-center z-50 px-4">
          <div className="w-auto max-w-5xl">
            <RegisterPetrolPumpForm onClose={() => setShowPetrolPumpForm(false)} />
          </div>
        </div>
      )} */}
      </footer>
    </>
  );
};

export default Footer;

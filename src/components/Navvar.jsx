import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Vehicle AMC", path: "/vehicle-amc" },
    { name: "Mechanic", path: "/mechanic" },
    { name: "Service Center", path: "/service-center" },
    { name: "Petrol Pump", path: "/petrol-pump" },
    { name: "Tow Truck", path: "/tow-truck" },
  ];
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  return (
    <>
      <nav className="hidden md:block fixed top-24 md:top-32 lg:top-[128px] left-0 w-full bg-[#E9F0FC] p-2 md:p-3 z-40 px-4 sm:px-6 md:px-8 lg:px-[100px]" role="navigation" aria-label="Main navigation">
        <ul className="flex justify-center gap-2 sm:gap-4 md:gap-7 lg:gap-10 text-[#242424]">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
              to={item.path}
              aria-current={(location.pathname === item.path || (item.path === "/vehicle-amc" && location.pathname === "/vehicle-amc-filter")) ? 'page' : undefined}
                className={`cursor-pointer transition-colors text-extrabold text-xs sm:text-sm md:text-base ${(location.pathname === item.path || (item.path === "/vehicle-amc" && location.pathname === "/vehicle-amc-filter")) ? 'text-[#266DDF] font-bold' : 'hover:text-[#266DDF]'}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="md:hidden fixed top-20 left-0 w-full bg-[#E9F0FC] p-3 z-50 px-4" role="navigation" aria-label="Mobile navigation">
        <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
          className="flex items-center justify-center w-10 h-10"
        >
          {isOpen ? (
            <X size={24} className="text-[#242424]" />
          ) : (
            <Menu size={24} className="text-[#242424]" />
          )}
        </button>
        {isOpen && (
          <ul className="flex flex-col gap-0 text-[#242424] bg-white rounded-lg mt-2 shadow-lg border border-gray-200">
            {menuItems.map((item, index) => (
              <li key={index} className="border-b border-gray-100 last:border-b-0">
                <Link
                to={item.path}
                onClick={handleLinkClick}
                aria-current={(location.pathname === item.path || (item.path === "/vehicle-amc" && location.pathname === "/vehicle-amc-filter")) ? 'page' : undefined}
                  className={`block px-4 py-3 cursor-pointer transition-colors ${(location.pathname === item.path || (item.path === "/vehicle-amc" && location.pathname === "/vehicle-amc-filter")) ? 'text-[#266DDF] font-bold bg-blue-50' : 'hover:bg-gray-100'}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </>
  );
}
export default Navbar;
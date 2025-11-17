import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Vehicle AMC", path: "/vehicle-amc" },
    { name: "Mechanic", path: "/mechanic" },
    { name: "Tow Truck", path: "/tow-truck" },
    { name: "E-Commerce", path: "/e-commerce" },
    { name: "Petrol Pump", path: "/petrol-pump" },
    { name: "Service Center", path: "/service-center" },
  ];
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  const navItemRef = useRef(null);
  const badgeRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      const element = navItemRef.current;
      const rec = window.innerWidth - element.getBoundingClientRect().right;
      if (rec < 250) {
        if (badgeRef.current) {
          badgeRef.current.style.right = "0px";
        }
      } else {
        if (badgeRef.current) {
          badgeRef.current.style.right = "auto";
        }
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <nav
        className="hidden md:flex items-center justify-center lg:h-12 h-14 w-full bg-[#E9F0FC]"
        role="navigation"
        aria-label="Main navigation"
      >
        <ul className="flex container justify-center gap-15 text-[17px] text-[#000000]">
          {menuItems.map((item, index) => (
            <li ref={navItemRef} key={index} className="relative group">
              {item.comingSoon && (
                <span
                  ref={badgeRef}
                  className="absolute md:top-[25px] top-full transform bg-gradient-to-r from-[#fb0200] to-[#4184ed] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap "
                >
                  Coming Soon
                </span>
              )}
              <Link
                to={item.path}
                aria-current={
                  location.pathname === item.path ||
                  (item.path === "/vehicle-amc" &&
                    location.pathname === "/vehicle-amc-filter")
                    ? "page"
                    : undefined
                }
                className={`cursor-pointer transition-colors text-extrabold text-xs sm:text-sm md:text-base ${
                  location.pathname === item.path ||
                  (item.path === "/vehicle-amc" &&
                    location.pathname === "/vehicle-amc-filter")
                    ? "text-[#266DDF] font-bold"
                    : "hover:text-[#266DDF]"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav
        id="mobileNav"
        className="md:hidden flex flex-col justify-center items-center w-full bg-[#E9F0FC]"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <header className="self-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="flex items-center justify-center py-3 px-5 self-start"
          >
            {isOpen ? (
              <X size={24} className="text-[#000000]" />
            ) : (
              <Menu size={24} className="text-[#000000]" />
            )}
          </button>
        </header>
      </nav>
      <main
        className={`w-[70vw] max-w-[500px] transition-all duration-300 ease fixed right-0 top-0 bottom-0 min-h-screen flex flex-col gap-7 bg-white z-30 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="py-8  relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="flex items-center justify-center p-4 self-start absolute top-1/2 -translate-y-1/2 right-3"
          >
            <X size={24} className="text-[#000000]" />
          </button>
        </div>
        <ul className="flex flex-col gap-7 w-full overflow-y-scroll hide-scrollbar text-black">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className=" border-b-[0.1px] border-gray-400 last:border-b-0 text-[16px]"
            >
              <Link
                to={item.path}
                onClick={handleLinkClick}
                aria-current={
                  location.pathname === item.path ||
                  (item.path === "/vehicle-amc" &&
                    location.pathname === "/vehicle-amc-filter")
                    ? "page"
                    : undefined
                }
                className={`block px-4 py-3 cursor-pointer transition-colors ${
                  location.pathname === item.path ||
                  (item.path === "/vehicle-amc" &&
                    location.pathname === "/vehicle-amc-filter")
                    ? "text-[#266DDF] font-bold"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.name}
                {item.comingSoon && (
                  <span
                    className="text-xs text-gray-500 ml-1"
                    title="Coming Soon"
                  >
                    (Coming Soon)
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
export default Navbar;

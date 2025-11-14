import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Vehicle AMC", path: "/vehicle-amc" },
    { name: "Mechanic", path: "", comingSoon: true },
    { name: "Tow Truck", path: "", comingSoon: true },
    { name: "E-Commerce", path: "", comingSoon: true },
    { name: "Petrol Pump", path: "", comingSoon: true },
    { name: "Service Center", path: "", comingSoon: true },
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
        <ul className="flex container justify-center gap-15 text-[17px] text-[#242424]">
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
            // <li
            //   key={index}
            //   ref={(el) => (parentRefs.current[index] = el)}
            //   className="relative group"
            //   onMouseEnter={() => {
            //     const badge = badgeRefs.current[index];
            //     if (badge) badge.style.opacity = 1;
            //   }}
            //   onMouseLeave={() => {
            //     const badge = badgeRefs.current[index];
            //     if (badge) badge.style.opacity = 0;
            //   }}
            // >
            //   {item.comingSoon && (
            //     <span
            //       ref={(el) => (badgeRefs.current[index] = el)}
            //       className="absolute bg-gradient-to-r from-[#fb0200] to-[#4184ed]
            //      text-white text-xs px-2 py-1 rounded
            //      transition-opacity duration-300 opacity-0 pointer-events-none
            //      whitespace-nowrap z-50"
            //     >
            //       Coming Soon
            //     </span>
            //   )}

            //   <Link
            //     to={item.path}
            //     aria-current={
            //       location.pathname === item.path ||
            //       (item.path === "/vehicle-amc" &&
            //         location.pathname === "/vehicle-amc-filter")
            //         ? "page"
            //         : undefined
            //     }
            //     className={`cursor-pointer transition-colors text-extrabold text-xs sm:text-sm md:text-base ${
            //       location.pathname === item.path ||
            //       (item.path === "/vehicle-amc" &&
            //         location.pathname === "/vehicle-amc-filter")
            //         ? "text-[#266DDF] font-bold"
            //         : "hover:text-[#266DDF]"
            //     }`}
            //   >
            //     {item.name}
            //   </Link>
            // </li>
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
            className="flex items-center justify-center p-4 self-start"
          >
            {isOpen ? (
              <X size={24} className="text-[#242424]" />
            ) : (
              <Menu size={24} className="text-[#242424]" />
            )}
          </button>
        </header>
        <main className="w-full">
          {isOpen && (
            <ul className="flex flex-col gap-0 w-full text-[#242424] bg-white rounded-lg mt-2 shadow-lg border border-gray-200">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="border-b border-gray-100 last:border-b-0"
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
                        ? "text-[#266DDF] font-bold bg-blue-50"
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
          )}
        </main>
      </nav>
    </>
  );
}
export default Navbar;
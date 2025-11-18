import React, {
  useState,
  useRef,
  useEffect,
  lazy,
  Suspense,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LocationDropdown = lazy(() => import("./LocationDropdown"));
const SearchBar = lazy(() => import("./Searchbar"));
const Button = lazy(() => import("./Button"));
const Logo = lazy(() => import("./Logo"));
const VerifyNumberPopup = lazy(() => import("../popup/VerifyNumberPopup"));
const AccountSidebar = lazy(() => import("./AccountSidebar"));

import { User } from "lucide-react";
import dropdownIcon from "../assets/down-arrow.svg";
import searchIcon from "../assets/SearchIcon.svg";

const LazyFallback = () => (
  <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
);

const Header = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const dropdownRef = useRef(null);

  const pages = {
    home: "/",
    about: "/about-us",
    amc: "/my-account?view=amc",
    mechanic: "/mechanic",
    Ecommerce: "/service-center",
    profile: "/my-account?view=profile",
    vehicle: "/my-account?view=vehicles",
    contact: "/contact-us",
  };

  const handleClick = () => {
    setOpen(!open);
    setQuery("");
  };

  // Close profile dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsProfileModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Suspense fallback={<LazyFallback />}>
      {/* ONLY ONE SUSPENSE WRAPS THE ENTIRE HEADER */}
      <div className="bg-white md:py-6 py-3.5 z-50">
        <div className="container">
          <div className="flex items-center md:justify-between">

            {/* Logo */}
            <Logo />

            {/* Desktop Search */}
            <div className="basis-1/3 md:block hidden">
              <SearchBar />
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">

              {/* Mobile Search */}
              <button
                onClick={handleClick}
                className="md:hidden border-r pr-2"
              >
                <img src={searchIcon} className="w-6 h-6" />
              </button>

              {/* Location */}
              <LocationDropdown />

              {/* Login Button */}
              {!isLoggedIn && (
                <Button
                  className="w-full text-white py-1 text-sm"
                  onClick={() => setIsVerifyOpen(true)}
                />
              )}

              {/* Profile Dropdown */}
              {isLoggedIn && (
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() =>
                      setIsProfileModalOpen(!isProfileModalOpen)
                    }
                  >
                    <User className="w-6 h-6 text-gray-800" />
                    <span className="hidden sm:block text-gray-800">Profile</span>
                    <img src={dropdownIcon} className="w-4 h-4" />
                  </div>

                  {isProfileModalOpen && (
                    <div className="absolute top-full right-0 mt-2 z-50">
                      <AccountSidebar
                        activeView=""
                        setActiveView={(view) => {
                          setIsProfileModalOpen(false);
                          if (view !== "logout") {
                            navigate(`/my-account?view=${view}`);
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search Bar */}
          {open && (
            <div className="relative md:hidden my-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full py-2 pl-10 border rounded-lg"
                placeholder="Search..."
              />
              <img src={searchIcon} className="absolute top-2 left-3 w-5" />
            </div>
          )}
        </div>

        {/* Login OTP Modal */}
        <VerifyNumberPopup
          isOpen={isVerifyOpen}
          onClose={() => setIsVerifyOpen(false)}
          isFromLogin={true}
        />
      </div>
    </Suspense>
  );
};

export default Header;

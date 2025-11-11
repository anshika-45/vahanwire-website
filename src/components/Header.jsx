import React, { useState, useRef, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const LocationDropdown = lazy(() => import("./LocationDropdown"));
const SearchBar = lazy(() => import("./Searchbar"));
const Button = lazy(() => import("./Button"));
const Logo = lazy(() => import("./Logo"));
const VerifyNumberPopup = lazy(() => import("../popup/VerifyNumberPopup"));
const AccountSidebar = lazy(() => import("./AccountSidebar"));
import { User } from "lucide-react";
import dropdownIcon from "../assets/down-arrow.webp";
import searchIcon from "../assets/search.webp";

const LazyFallback = () => (
  <div className="w-4 h-4 bg-[#ffffff] animate-pulse"></div>
);
const Header = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      e.preventDefault();

      const pages = {
        home: "/",
        about: "/about",
        amc: "/my-account?view=amc",
        profile: "/my-account?view=profile",
        vehicle: "my-account?view=vehicles",
      };

      const lowerQuery = query.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(pages, lowerQuery)) {
        navigate(pages[lowerQuery]);
      }
      return;
    }
  };
  const dropdownRef = useRef(null);
  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };
  const handleSidebarSelect = (view) => {
    setIsProfileModalOpen(false);
    if (view !== "logout") {
      navigate(`/my-account?view=${view}`);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLogin = () => {
    setIsVerifyOpen(true);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="bg-white md:py-6 py-3.5 z-50">
      <div className="container">
        <div className="flex items-center justify-between gap-1">
          <Suspense fallback={<LazyFallback />}>
            <Logo />
          </Suspense>

          <div className="basis-1/3 md:block hidden justify-self-center">
            <Suspense fallback={<LazyFallback />}>
              <SearchBar />
            </Suspense>
          </div>
          <div className="flex items-center justify-end gap-3 basis-auto">
            <div className="flex items-center gap-1">
              <button
                onClick={handleClick}
                aria-label="Toggle search"
                className="md:hidden block mr-1 border-r border-gray-300 pr-2 bg-transparent cursor-pointer min-w-[25px]"
              >
                <img
                  className="w-4 h-4 object-contain"
                  src={searchIcon}
                  alt="search icon"
                />
              </button>
              <Suspense fallback={<LazyFallback />}>
                <LocationDropdown />
              </Suspense>
            </div>
            {!isLoggedIn && (
              <div className="md:w-auto w-[80px]">
                <Suspense fallback={<LazyFallback />}>
                  <Button
                    className="w-full text-white py-1 text-sm sm:text-base"
                    onClick={handleLogin}
                  />
                </Suspense>
              </div>
            )}
            {isLoggedIn && (
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center gap-1 cursor-pointer hover:opacity-80"
                  onClick={handleProfileClick}
                  role="button"
                  tabIndex={0}
                  aria-label="Open profile menu"
                  onKeyDown={(e) => e.key === "Enter" && handleProfileClick()}
                >
                  <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full flex items-center justify-center">
                    <User size={16} className="sm:w-5 sm:h-5 text-gray-800" />
                  </div>
                  <span className="hidden sm:inline text-sm sm:text-base text-gray-800">
                    Profile
                  </span>
                  <img
                    src={dropdownIcon}
                    loading="lazy"
                    alt="dropdown"
                    className="w-4 sm:w-5 h-4 sm:h-5"
                  />
                </div>

                {isProfileModalOpen && (
                  <div className="absolute top-full right-0 mt-2 z-50">
                    <Suspense fallback={<LazyFallback />}>
                      <AccountSidebar
                        activeView=""
                        setActiveView={handleSidebarSelect}
                      />
                    </Suspense>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div
          id="headerSearchbarForMobile"
          className={`${
            open ? "max-h-7 py-1 my-2 opacity-100" : "max-h-0 opacity-0"
          } duration-200 ease-in-out transition-all`}
        >
          <div className="relative md:hidden block">
            <label htmlFor="mobile-search-input" className="sr-only">
              Search
            </label>
            <img
              src={searchIcon}
              loading="lazy"
              alt="Search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            />
            <input
              id="search-input"
              className={`py-2 pl-10 pr-4 text-sm ${
                open
                  ? "w-full rounded-[6px] border-2 border-[#E3EDFC] focus:outline-none focus:ring-1 focus:ring-[#E3EDFC]"
                  : ""
              }`}
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
      <Suspense fallback={<LazyFallback />}>
        <VerifyNumberPopup
          isOpen={isVerifyOpen}
          onClose={() => setIsVerifyOpen(false)}
          isFromLogin={true}
        />
      </Suspense>
    </div>
  );
};
export default Header;

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
  <div className="w-4 h-4 bg-gray-200 animate-pulse"></div>
);
const Header = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleProfileClick = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };
  const handleSidebarSelect = (view) => {
    setIsProfileModalOpen(false);
    navigate(`/my-account?view=${view}`);
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
    <div className=" bg-white mx-auto md:h-26 h-20 transition-all duration-300 ease-in z-50 gap-2 sm:gap-4 flex  items-center">
      <div className="container">
        <div className="flex items-center">
          <div className="flex w-full justify-between">
            <Suspense fallback={<LazyFallback />}>
              <Logo />
            </Suspense>
            <div className=" hidden md:flex items-center justify-end">
              <Suspense fallback={<LazyFallback />}>
                <SearchBar />
              </Suspense>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 w-full">
            <div className="flex items-center gap-1">
              <div
                role="button"
                onClick={handleClick}
                className="md:hidden block"
              >
                <img
                id="searchIcon"
                  className="w-4 h-4 object-contain"
                  src={searchIcon}
                  alt="searchicon"
                />
              </div>
              <Suspense fallback={<LazyFallback />}>
                <LocationDropdown />
              </Suspense>
            </div>
            <div>
              {!isLoggedIn && (
                <Suspense fallback={<LazyFallback />}>
                  <Button className=" text-white" onClick={handleLogin} />
                </Suspense>
              )}
            </div>
            {isLoggedIn && (
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center gap-1 cursor-pointer hover:opacity-80"
                  onClick={handleProfileClick}
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
                    alt="location"
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
        <Suspense fallback={<LazyFallback />}>
          <VerifyNumberPopup
            isOpen={isVerifyOpen}
            onClose={() => setIsVerifyOpen(false)}
            isFromLogin={true}
          />
        </Suspense>
      </div>
    </div>
  );
};
export default Header;

import React, { useState, useRef, useEffect, Suspense, lazy } from "react";
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
const Header = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleLogin = () => {
    setIsVerifyOpen(true);
  };
  return (
    <div className="fixed top-6 md:top-[28px] left-0 right-0 flex justify-between items-center w-full h-20 md:h-[100px] px-4 md:px-8 lg:px-[100px] py-4 md:py-[26px] bg-white mx-auto z-50 gap-2 sm:gap-4">
      <Logo />
      <div className="hidden md:block flex-1" fetchPriority="high"
        decoding="async">
        <SearchBar />
      </div>
      <div className="hidden lg:block">
        <LocationDropdown />
      </div>
      {!isLoggedIn && <Button className="h-11 text-white" onClick={handleLogin} />}
      {isLoggedIn && (
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-1 cursor-pointer hover:opacity-80"
            onClick={handleProfileClick}
          >
            <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full flex items-center justify-center">
              <User size={16} className="sm:w-5 sm:h-5 text-gray-800" />
            </div>
            <span className="hidden sm:inline text-sm sm:text-base text-gray-800">Profile</span>
            <img src={dropdownIcon} loading="lazy" alt="location" className="w-4 sm:w-5 h-4 sm:h-5" />
          </div>
          {isProfileModalOpen && (
            <div className="absolute top-full right-0 mt-2 z-50">
              <AccountSidebar activeView="" setActiveView={handleSidebarSelect} />
            </div>
          )}
        </div>
      )}
      <VerifyNumberPopup
        isOpen={isVerifyOpen}
        onClose={() => setIsVerifyOpen(false)}
        isFromLogin={true}
      />
    </div>
  );
};
export default Header;
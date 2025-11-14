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
import dropdownIcon from "../assets/down-arrow.svg";
import searchIcon from "../assets/SearchIcon.svg";

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
  const [suggestions, setSuggestions] = useState([]);

  const pages = {
    home: "/",
    about: "/about-us",
    amc: "/my-account?view=amc",
    profile: "/my-account?view=profile",
    vehicle: "/my-account?view=vehicles",
    contact: "/contact-us",
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const regex = new RegExp(value, "i");
      const matched = Object.keys(pages).filter((page) => regex.test(page));

      if (matched.length > 0) {
        setSuggestions(matched);
      } else {
        setSuggestions(["__no_match__"]);
      }
    } catch {
      setSuggestions(["__no_match__"]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      e.preventDefault();

      const lowerQuery = query.toLowerCase();
      if (pages[lowerQuery]) {
        navigate(pages[lowerQuery]);
      }
      //  else {
      //   navigate(`/search?query=${encodeURIComponent(query)}`);
      // }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion === "__no_match__") return;

    navigate(pages[suggestion]);
    setQuery("");
    setSuggestions([]);
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
    setQuery("");
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
        {open && (
          <div
            id="headerSearchbarForMobile"
            className={`search-bar-animation relative max-h-7 py-1 my-2`}
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
                type="text"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
              />
            </div>
            {query.trim() !== "" && suggestions.length > 0 && (
              <div className="absolute bg-white border border-[#E3EDFC] rounded-md mt-1 w-full shadow-sm z-20">
                {suggestions.map((item, index) =>
                  item === "__no_match__" ? (
                    <div
                      key={index}
                      className="px-4 py-2 text-gray-500 cursor-default"
                    >
                      No matching pages found
                    </div>
                  ) : (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(item)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}
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

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import userIcon from "../assets/user.webp";
import vehicleIcon from "../assets/avehicle.webp";
import moneyIcon from "../assets/money.webp";
import { LogOut } from "lucide-react";
import { getUserVehicles } from "../api/vehicleApi";
import { logoutUser } from "../api/authApi";

const AccountSidebar = ({ activeView, setActiveView }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [vehicleCount, setVehicleCount] = useState(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const fetchVehicleCount = async () => {
      try {
        const vehicles = await getUserVehicles();
        setVehicleCount(vehicles.length);
      } catch (error) {
        setVehicleCount(0);
        console.error("Error fetching vehicle count:", error);
      }
    };
    fetchVehicleCount();

    const handleVehicleCountChange = () => {
      fetchVehicleCount();
    };

    window.addEventListener("vehicleCountChanged", handleVehicleCountChange);

    return () => {
      window.removeEventListener("vehicleCountChanged", handleVehicleCountChange);
    };
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      logout();
      navigate("/", { replace: true });
    }
  };

  const sidebarItems = [
    { id: "profile", label: "My Profile", img: userIcon, alt: "profileIcon" },
    {
      id: "vehicles",
      label: "My Vehicle",
      img: vehicleIcon,
      alt: "vehicleIcon",
      badge: vehicleCount > 0 ? vehicleCount : null,
    },
    { id: "amc", label: "My AMC", img: moneyIcon, alt: "moneyIcon" },
  ];

  return (
    <aside className="w-full md:w-72 lg:w-80 bg-white rounded-[20px] overflow-hidden shadow-sm">
      <div className="px-4 py-3">
        <h2 className="text-base sm:text-[17px] md:text-[18px] font-medium text-[#2F3A41]">
          My Account
        </h2>
      </div>
      <nav className="flex flex-col py-1 sm:py-2">
        {sidebarItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center w-full gap-3 px-3 sm:px-4 py-3 sm:py-3.5 text-left transition-all duration-100 ${
                isActive
                  ? "bg-[#F0F7FF] border-l-4 border-[#266DDF] font-medium"
                  : "bg-transparent hover:bg-gray-50"
              }`}
            >
              <img
                src={item.img}
                alt={item.label}
                loading="lazy"
                className={`w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 object-contain shrink-0 ${
                  isActive ? "opacity-100" : "opacity-80"
                }`}
              />
              <span className="flex-1 text-sm sm:text-[15px] md:text-base truncate">
                {item.label}
              </span>
              {item.badge && (
                <span className="text-gray-900 font-semibold shrink-0">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
        <div className="border-t border-gray-200 mt-1 sm:mt-2"></div>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center w-full gap-3 px-3 sm:px-4 py-3 sm:py-3.5 text-left transition-all duration-100 bg-transparent hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut size={20} className="text-red-500 shrink-0" />
          <span className="flex-1 text-sm sm:text-[15px] md:text-base text-red-500 font-medium">
            {isLoggingOut ? "Logging out..." : "Logout"}
          </span>
        </button>
      </nav>
    </aside>
  );
};

export default AccountSidebar;
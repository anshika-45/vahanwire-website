import React from "react";
import userIcon from "../assets/user.webp";
import vehicleIcon from "../assets/avehicle.webp";
import moneyIcon from "../assets/money.webp";
const AccountSidebar = ({ activeView, setActiveView }) => {
  const sidebarItems = [
    { id: "profile", label: "My Profile", img: userIcon, alt: "profileIcon" },
    {
      id: "vehicles",
      label: "My Vehicle",
      img: vehicleIcon,
      alt: "vehicleIcon",
    },
    { id: "amc", label: "My AMC", img: moneyIcon, alt: "moneyIcon" },
  ];
  return (
    <aside
      className="
        w-full md:w-72 lg:w-80
        bg-white rounded-[20px] overflow-hidden shadow-sm
      "
    >
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
              className={`
                flex items-center w-full gap-3
                px-3 sm:px-4 py-3 sm:py-3.5
                text-left transition-all duration-100
                
                ${
                  isActive
                    ? "bg-[#F0F7FF] border-l-4 border-[#266DDF] font-medium"
                    : "bg-transparent hover:bg-gray-50"
                }
              `}
            >
              <img
                src={item.img}
                alt={item.label}
                loading="lazy"
                className={`w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 object-contain flex-shrink-0 ${
                  isActive ? "opacity-100" : "opacity-80"
                }`}
              />
              <span className="flex-1 text-sm sm:text-[15px] md:text-base truncate">
                {item.label}
              </span>
              {item.badge && (
                <span className="text-gray-900 font-semibold flex-shrink-0">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
export default AccountSidebar;

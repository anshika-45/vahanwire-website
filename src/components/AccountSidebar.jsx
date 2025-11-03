import React from "react";
import userIcon from "../assets/user.webp";
import vehicleIcon from "../assets/avehicle.webp";
import moneyIcon from "../assets/money.webp";
const AccountSidebar = ({ activeView, setActiveView }) => {
  const sidebarItems = [
    { id: "profile", label: "My Profile", img: userIcon },
    { id: "vehicles", label: "My Vehicle-2", img: vehicleIcon },
    { id: "amc", label: "My AMC", img: moneyIcon },
  ];
  return (
    <aside className="w-full sm:w-[260px] md:w-[280px] lg:w-[300px] bg-white rounded-[20px] overflow-hidden shadow-sm">
      <div className="px-4 py-3">
        <h2 className="text-[18px] sm:text-[19px] md:text-[20px] font-medium text-[#2F3A41]">
          My Account
        </h2>
      </div>
      <nav className="flex flex-col py-2 gap-1 sm:gap-2">
        {sidebarItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex items-center w-full gap-3 px-3 sm:px-4 py-2 sm:py-3 text-left transition-all duration-200 ${
                isActive
                  ? "bg-[#F0F7FF] border-l-4 border-[#266DDF] font-medium"
                  : "bg-transparent border-transparent hover:bg-gray-50"
              }`}
            >
              <img
                src={item.img}
                alt={item.label}
                loading="lazy"
                className={`w-5 h-5 object-contain flex-shrink-0 ${
                  isActive ? "opacity-100" : "opacity-80"
                }`}
              />
              <span className="flex-1 text-[14px] sm:text-[15px] md:text-[16px] truncate">
                {item.label}
              </span>
              {item.badge && (
                <span className="text-gray-900 font-semibold flex-shrink-0">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
export default AccountSidebar;
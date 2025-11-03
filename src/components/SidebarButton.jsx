import React from "react";
import { Link, useLocation } from "react-router-dom";
const SidebarButton = ({ iconClass, label, extra }) => {
  const location = useLocation();
  const isActive =
    (label === "My Profile" && location.pathname === "/account/profile") ||
    (label === "My Vehicle's" && location.pathname === "/account/vehicles") ||
    (label === "My AMC" && location.pathname === "/account/amc");
  const pathMap = {
    "My Profile": "/account/profile",
    "My Vehicle's": "/account/vehicles",
    "My AMC": "/account/amc",
  };
  return (
    <Link
      to={pathMap[label]}
      className={`flex items-center gap-2 md:gap-3 px-2 md:px-4 py-1.5 md:py-2 rounded hover:bg-[#D9E7FE] transition text-xs md:text-base z-auto ${
        isActive ? "bg-[#D9E7FE] text-[#266DDF] font-medium" : "text-[#2F3A41]"
      }`}
    >
      <i className={`${iconClass} text-sm md:text-base`}></i>
      <span className="truncate">{label}</span>
      {extra && <span className="ml-auto text-xs md:text-xs text-[#2F3A41] flex-shrink-0">{extra}</span>}
    </Link>
  );
};
export default SidebarButton;
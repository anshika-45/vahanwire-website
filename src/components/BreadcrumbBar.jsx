import React from "react";
import { useLocation, Link } from "react-router-dom";
function BreadcrumbBar() {
  const location = useLocation();
  const pathname = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  let pathnames = pathname.split("/").filter(Boolean);
  let view;
  if (pathname === "/") return null;
  if (pathname === "/my-account") {
    view = searchParams.get("view") || "profile";
    const displayView =
      view === "amc" ? "AMC" : view.charAt(0).toUpperCase() + view.slice(1);
    pathnames.push(displayView);
  }
  return (
    <div className="bg-[#FAFAFA] text-gray-600 text-sm px-4 md:px-8 lg:px-16 xl:px-[100px] py-2 md:py-2 border-t border-gray-300 w-full overflow-x-auto">
      <nav className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 whitespace-nowrap">
        <Link to="/" className="hover:text-[#266DDF] flex-shrink-0 text-[16px]">
          Home
        </Link>
        {pathnames.map((name, index) => {
          let routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          if (pathname.startsWith("/my-account") && index === 1 && view) {
            routeTo = `/my-account?view=${view}`;
          }
          const displayName =
            name === "vehicle-amc-filter"
              ? "vehicle amc"
              : name === "account"
              ? "My Account"
              : name.replaceAll("-", " ");
          return (
            <div
              key={index}
              className="flex items-center space-x-2 flex-shrink-0"
            >
              <span>{">"}</span>
              {isLast ? (
                <span className="text-gray-900 capitalize text-[17px] ">
                  {displayName}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="hover:text-[#266DDF] capitalize text-[17px]"
                >
                  {displayName}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
export default BreadcrumbBar;

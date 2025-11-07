// src/pages/MyAccount.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";
import AccountBanner from "../components/AccountBanner";
import AccountSidebar from "../components/AccountSidebar";
import ProfileForm from "../components/ProfileForm";
import CarCards from "../components/CarCards";
import MyAMCPage from "../components/MyAMCPage";
// import AddBanner from "../components/AddBanner";

function MyAccount() {
  const { setIsLoggedIn } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const viewParam = searchParams.get("view");
  const [activeView, setActiveView] = useState(viewParam || "profile");

  useEffect(() => {
    setIsLoggedIn(true);
  }, [setIsLoggedIn]);

  useEffect(() => {
    if (viewParam && viewParam !== activeView) {
      setActiveView(viewParam);
    }
  }, [viewParam]); // eslint-disable-line

  const handleChangeView = (next) => {
    setActiveView(next);
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("view", next);
      return p;
    }, { replace: true });
  };

  const renderContent = () => {
    switch (activeView) {
      case "vehicles":
        return <CarCards />;
      case "amc":
        return <MyAMCPage />;
      case "profile":
      default:
        return <ProfileForm />;
    }
  };
  return (
    <div className="bg-[#F4F4F4] py-8 sm:py-10 md:py-5 ">
      <div className="">

        <div className="mb-6 sm:mb-8">
          <AccountBanner />
        </div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 md:px-8 lg:px-10">

        <div className="flex flex-col md:flex-row gap-15">
          <div className="w-full md:w-72 shrink-0 ">
            <AccountSidebar
              activeView={activeView}
              setActiveView={handleChangeView}
            />
          </div>

          <div className="flex-1 w-full">
            {renderContent()}
          </div>
        </div>
        </div>

      </div>
    </div>
  );
}

export default MyAccount;
